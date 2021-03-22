import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'

import { ApiService } from '../../../services/api.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  local = JSON.parse(localStorage.getItem('actualRestaurant'));
  rooms;

  constructor(
	public loadingCtrl:LoadingController,
	public nav:NavController,
	public alertCtrl:AlertController,
	public toast:ToastController,
	public api:ApiService,
	public events:EventsService,
	public route:ActivatedRoute,
  	) { }

  ngOnInit() {

  	this.api.myRooms({id:this.route.snapshot.params.id}).subscribe(data=>{
  		this.rooms = data;
  		console.log(data);
  	})
  }

}
