import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-blockeds',
  templateUrl: './blockeds.page.html',
  styleUrls: ['./blockeds.page.scss'],
})
export class BlockedsPage implements OnInit {

  blockeds = [];
  user = JSON.parse(localStorage.getItem('ANuser'));
  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, public events: EventsService) { }

  ngOnInit()
  {
  	this.getBlocked()
  }

  getBlocked()
  {
  	this.api.getBlocked(this.user.id).subscribe((data:any)=>{
  		this.blockeds = data;
  	})
  }

  unblock(id,name)
  {
  	this.alert.create({message:"Va a desbloquear al usuario "+name,buttons: [
  		{
  			text:"Si",
  			handler: ()=>{
			  	this.loading.create().then(l=>{
			  		l.present();
				  	this.api.unblock({id:id}).subscribe((data:any)=>{
				  		l.dismiss();
				  		this.getBlocked();
				  		this.events.publish('getAprobedAll');
				  	})
			  	})
  			}
  		},{
  			text:"No"
  		}
  	]}).then(a=>{
  		a.present();
  	})
  }

}
