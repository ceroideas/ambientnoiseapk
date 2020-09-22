import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  	setTimeout(()=>{
  		if (localStorage.getItem('ANuser')) {
  			let role = JSON.parse(localStorage.getItem('ANuser'))['role'];
        console.log(role);
  			if (role == 2) {
  				return this.nav.navigateRoot('tabs');
  			}else{
  				return this.nav.navigateRoot('local');
  			}
  		}
  		this.nav.navigateRoot('welcome');
  	},2000)
  }

}
