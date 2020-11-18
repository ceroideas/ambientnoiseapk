import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tactic',
  templateUrl: './tactic.page.html',
  styleUrls: ['./tactic.page.scss'],
})
export class TacticPage implements OnInit {

  local = JSON.parse(localStorage.getItem('actualLocal'));

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  openCart() {
  	localStorage.setItem('openCart','1');
    // this.nav.navigateForward('/tabs/home/detalles/'+this.local.id);
  	this.nav.back();
  }

}
