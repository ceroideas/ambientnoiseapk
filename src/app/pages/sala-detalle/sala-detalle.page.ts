import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sala-detalle',
  templateUrl: './sala-detalle.page.html',
  styleUrls: ['./sala-detalle.page.scss'],
})
export class SalaDetallePage implements OnInit {

  data = [];

  constructor(public nav: NavController) {
  	this.data = JSON.parse(localStorage.getItem('toLike'));
  }

  ngOnInit() {
  }

}
