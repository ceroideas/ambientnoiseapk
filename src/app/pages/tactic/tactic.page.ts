import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tactic',
  templateUrl: './tactic.page.html',
  styleUrls: ['./tactic.page.scss'],
})
export class TacticPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  openCart() {
  	localStorage.setItem('openCart','1');
  	this.nav.back();
  }

}
