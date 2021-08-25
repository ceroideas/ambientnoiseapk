import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.page.html',
  styleUrls: ['./nueva-reserva.page.scss'],
})
export class NuevaReservaPage implements OnInit {

  todo:any = {};
  type;

  validations_form1: FormGroup;
  validation_messages1: any;

  user = JSON.parse(localStorage.getItem('ANuser'));

  locals:any;

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    public toast: ToastController, public events: EventsService, public route: ActivatedRoute) { }

  ngOnInit() {

    console.log(this.route.snapshot.params.id);
  	this.validation_messages1 = {
      'date': [
        { type: 'required', message: 'Indique la fecha de la reserve' },
      ],
      'from': [
        { type: 'required', message: 'Debe indicar la validez de la reserva' },
      ],
      'to': [
        { type: 'required', message: 'Debe indicar la validez de la reserva' },
      ],
      'price': [
        { type: 'required', message: 'Debe indicar el precio de la reserva' },
      ],
    };

    this.validations_form1 = this.formBuilder.group({
      date: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      from: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      to: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      price: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }

  publishReserve()
  {
  	let data = {
  		room_id: this.route.snapshot.params.id,
  		date :moment(this.validations_form1.value.date).format('YYYY-MM-DD'),
  		hour_from :moment(this.validations_form1.value.from).format('HH'),
  		minute_from :moment(this.validations_form1.value.from).format('mm'),
  		hour_to :moment(this.validations_form1.value.to).format('HH'),
  		minute_to :moment(this.validations_form1.value.to).format('mm'),
  		price :this.validations_form1.value.price,
  	}

  	this.loading.create().then(l=>{
        l.present();
        this.api.saveReserve(data).subscribe(data=>{
          l.dismiss();
          this.nav.pop();
          this.events.publish('reloadReserves');
          this.alert.create({message:"La reserva ha sido creada"}).then(a=>{
            a.present(); setTimeout(()=>{a.dismiss()},3000);
          })
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar la reserva"}).then(a=>{
            a.present(); setTimeout(()=>{a.dismiss()},3000);
          })
        })
      })
  }

}
