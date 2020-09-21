import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  openDetalle(img,nombre,edad)
  {
  	localStorage.setItem('toLike',JSON.stringify([img,nombre,edad]));
  	this.nav.navigateForward('tabs/home/sala-detalle');
  }

}
