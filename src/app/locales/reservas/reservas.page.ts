import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  reserves:any = [];
  room:any = [];

  constructor(public api: ApiService, public navparams: NavparamsService, public nav: NavController, public alertCtrl: AlertController, public events: EventsService,
  	public loading: LoadingController, public toast: ToastController, public route: ActivatedRoute) {
  	this.api.getRoom(this.route.snapshot.params.id).subscribe(data=>{
  		this.room = data;
  	});
    this.getReserves();
  }

  getReserves()
  {
    this.api.getReserves(this.route.snapshot.params.id).subscribe(data=>{
      this.reserves = data;
    })
  }

  ngOnInit() {
    this.events.destroy('reloadReserves')
    this.events.subscribe('reloadReserves',()=>{
      this.getReserves();
    })
  }

  deleteReserve(r)
  {
     this.alertCtrl.create({message:"Borrar reserva?",buttons:[
       {text:"Si", handler:()=>{
         this.api.deleteReserve(r.id).subscribe(data=>{
           this.reserves = data;
         })
     }},{
       text: "No"
     }
     ]}).then(a=>a.present());
  }

}
