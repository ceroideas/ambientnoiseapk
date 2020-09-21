import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.page.html',
  styleUrls: ['./ropero.page.scss'],
})
export class RoperoPage implements OnInit {

  quantity = 0;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  subQ()
  {
  	if (this.quantity > 0) {
  		this.quantity--;
  	}
  }

  addQ()
  {
  	this.quantity++;
  }

}
