import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  
  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController) { }

  ngOnInit() {
  	this.validation_messages = {
      'name': [
        { type: 'required', message: 'El campo de nombre es requerido' },
        { type: 'minlength', message: 'La nombre debe tener al menos 4 caracteres' }
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
      'subject': [
        { type: 'required', message: 'El campo de asunto es requerido' }
      ],
      'message': [
        { type: 'required', message: 'El campo de mensaje es requerido' }
      ],
    };

    this.validations_form = this.formBuilder.group({
      name: new FormControl(this.user.name+' '+this.user.last_name, Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      phone: new FormControl(null),
      subject: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      message: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  sendContact(value)
  {
  	this.loadingCtrl.create().then(l=>{
  		l.present();

  		this.api.contact(value).subscribe(data=>{
  			l.dismiss();

  			this.alertCtrl.create({message:"Contacto enviado, espere respuesta.",buttons:[{text: "Ok!"}]}).then(a=>a.present());
  			console.log('contacto enviado');
  		})
  	})
  }

}
