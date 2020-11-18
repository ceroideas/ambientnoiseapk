import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-t-ofertas',
  templateUrl: './t-ofertas.page.html',
  styleUrls: ['./t-ofertas.page.scss'],
})
export class TOfertasPage implements OnInit {

  local = JSON.parse(localStorage.getItem('actualLocal'));

  offers:any;

  constructor(public nav: NavController, public api: ApiService) { }

  ngOnInit() {
  	this.api.getOffers(this.local.id).subscribe(data=>{
  		this.offers = data;
  	})
  }

}
