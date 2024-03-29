import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { QrPage } from '../qr/qr.page';

@Component({
  selector: 'app-my-reserves',
  templateUrl: './my-reserves.page.html',
  styleUrls: ['./my-reserves.page.scss'],
})
export class MyReservesPage implements OnInit {

  reserves:any = [];
  local:any;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public api: ApiService, public navparams: NavparamsService, public nav: NavController, public alertCtrl: AlertController, public events: EventsService,
  	public loading: LoadingController, public toast: ToastController, public route: ActivatedRoute, public modal: ModalController) {
    this.getReservas();
  }

  ngOnInit() {

  }

  getReservas()
  {
    this.api.getReservas(this.user.id,null).subscribe(data=>{
      this.reserves = data;
      this.local = this.navparams.getParam();
    });
  }

  async verQr(r)
  {
    let data = {"type":"reserve","id":r.id,"status":r.status,"total":r.price};

    const modal = await this.modal.create({
      component: QrPage,
      cssClass: "qrPage",
      componentProps: {
        'data': JSON.stringify(data),
        'reserva': 1,
      }
    });
    return await modal.present();
  }

  borrar(r)
  {
    this.alertCtrl.create({message:"Borrar la reserva expirada de la lista?",buttons:[{
      text:"Si",
      handler:()=>{
        this.loading.create().then(a=>{
          a.present();

          this.api.deleteReserve(r.id).subscribe(data=>{
            a.dismiss();

            this.getReservas();
          })
        })
      }
    },{
      text:"No"
    }]}).then(a=>a.present());
  }

}
