import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
// import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-l-ofertas',
  templateUrl: './l-ofertas.page.html',
  styleUrls: ['./l-ofertas.page.scss'],
})
export class LOfertasPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));

  offers:any = [];

  page = 1;

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public loading: LoadingController, public alert: AlertController) { }

  ngOnInit() {
  	this.getMyOffers();

  	this.events.destroy('reloadOffers');
  	this.events.subscribe('reloadOffers',()=>{
      this.page = 1;
  		this.getMyOffers();
  	});
    this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });
  }

  getMyOffers(event = null)
  {
  	this.api.getMyOffers(this.user.id,this.page).subscribe((data:any)=>{
  		// this.offers = this.offers.concat(data.data);
      this.offers = data.data;
  	  
      if (event) {
        event.target.complete();

        if (!data.length) {
          event.target.disabled = true;
        }
      }
    })
  }

  getMoreOffers(event)
  {
    this.page+=1;
    this.getMyOffers(event);
  }


  deleteOffer(id)
  {
    this.alert.create({message:"Desea borrar la oferta seleccionada?", buttons:[{text:"Si, borrar", handler:()=>{
      this.loading.create().then(l=>{
        l.present();

        this.api.deleteOffer(id).subscribe(data=>{
          l.dismiss();
          this.offers = [];
          this.page = 1;
          this.getMyOffers();
        })
      })
    }},{text:"Cancelar"}]}).then(a=>{a.present()});
  }

}
