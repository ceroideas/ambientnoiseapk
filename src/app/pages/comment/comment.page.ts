import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public route: ActivatedRoute) {
  	this.api.myComment(this.user.id,this.route.snapshot.params.id).subscribe((data:any)=>{
  		this.validations_form.patchValue({
			'stars':data.stars,
			'comment':data.comment,
  		})
  	})
  }

  ngOnInit() {
  	this.validation_messages = {
      'stars': [
        { type: 'required', message: 'Elija una calificación' },
      ],
      'comment': [
        { type: 'required', message: 'Escriba un comentario' },
      ],
    };

    this.validations_form = this.formBuilder.group({
      user_id: new FormControl(this.user.id),
      establishment_id: new FormControl(this.route.snapshot.params.id),
      stars: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      comment: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
    });
  }

  saveComment(values)
  {
  	this.loadingCtrl.create().then(l=>{
  		l.present();

  		this.api.comment(values).subscribe(data=>{
			console.log('saved');
			l.dismiss();

			this.nav.pop();

  			this.alertCtrl.create({message:"Se ha publicado tu comentario!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
  		})
  	})
  }

}
