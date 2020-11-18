import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {

  reserves:any = [];
  rooms:any = [];
  local:any;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public api: ApiService, public navparams: NavparamsService, public nav: NavController, public alertCtrl: AlertController, public events: EventsService,
  	public loading: LoadingController, public toast: ToastController, public route: ActivatedRoute) {
  	this.api.getRooms(this.route.snapshot.params.id).subscribe(data=>{
  		this.rooms = data;
  		this.local = this.navparams.getParam();
  		console.log(this.navparams.getParam());
  	});
  }

  ngOnInit() {

  }

  reservar(r,s)
  {
    this.alertCtrl.create({message: "Desea hacer ésta reservación con un costo de "+r.price+"€?", buttons: [
    {
      text:"Si",
      handler:()=>{

        this.api.reservar({id:r.id,user_id:this.user.id}).subscribe(data=>{
          
          this.alertCtrl.create({message:'Se ha reservado la sala '+s.title+'. Consulte sus reservas.'}).then(a=>a.present());

          this.api.getRooms(this.route.snapshot.params.id).subscribe(data=>{
            this.rooms = data;
          });
          
        })
      }
    },{
      text:"No"
    }
    ]}).then(a=>a.present());
  }

}
