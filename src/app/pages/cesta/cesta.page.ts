import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {

  quantity0 = 0;
  quantity1 = 0;
  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  subQ(i)
  {
  	if (this['quantity'+i] > 0) {
  		this['quantity'+i]--;
  	}
  }

  addQ(i)
  {
  	this['quantity'+i]++;
  }

}
