import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public router: Router, public events: EventsService) {
    this.events.publish('showClientMenu');
  }

  tutorial;

  ngOnInit() {
  	if (!localStorage.getItem('tutorial')) {
  		this.tutorial = 1;
  		localStorage.setItem('tutorial','1');
  	}else{

  		this.tutorial = localStorage.getItem('tutorial');
  		if (localStorage.getItem('tutorial_url')) {

        if (this.tutorial < 14) {
  			  this.router.navigateByUrl(localStorage.getItem('tutorial_url'));
        }

	  		if (localStorage.getItem('tutorial_url') == 'tabs/home/detalles' && this.tutorial > 2) {
	  			setTimeout(()=>{
	  				this.events.publish('scrollBottom');
	  			},1000)
	  		}
  		}
  	}
  }

  nextTutorial(i)
  {
  	if (i < this.tutorial || i != parseInt(localStorage.getItem('tutorial'))+1 ) {
  		return false;
  	}
  	this.tutorial = i;
  	localStorage.setItem('tutorial',i);

  	if (this.tutorial == 2) {
  		this.router.navigateByUrl('tabs/home/detalles');
  		localStorage.setItem('tutorial_url','tabs/home/detalles')
  	}
  	if (this.tutorial == 3) {
  		this.events.publish('scrollBottom');
  	}
  	// if (this.tutorial == 4) {}
  	// if (this.tutorial == 5) {}
  	// if (this.tutorial == 6) {}
  	// if (this.tutorial == 7) {}
  	// if (this.tutorial == 8) {}

  	if (this.tutorial == 9) {
  		this.router.navigateByUrl('tabs/ofertas');
  		localStorage.setItem('tutorial_url','tabs/ofertas')
  	}
  	if (this.tutorial == 10) {
  		this.router.navigateByUrl('tabs/eventos');
  		localStorage.setItem('tutorial_url','tabs/eventos')
  	}
  	if (this.tutorial == 11) {
  		this.router.navigateByUrl('tabs/favoritos');
  		localStorage.setItem('tutorial_url','tabs/favoritos')
  	}
  	if (this.tutorial == 12) {
  		this.router.navigateByUrl('tabs/chat-room');
  		localStorage.setItem('tutorial_url','tabs/chat-room')
  	}
  	if (this.tutorial == 13) {
  		this.router.navigateByUrl('tabs/perfil');
  		localStorage.setItem('tutorial_url','tabs/perfil')
  	}
  	if (this.tutorial == 14) {
  		this.router.navigateByUrl('tabs/home');
  		localStorage.setItem('tutorial_url','tabs/home');
      this.events.publish('restoreCourseOf');
      this.events.publish('restoreCourseEv');
      this.events.publish('restoreCourseFv');
      this.events.publish('restoreCourseChat');
  	}
  }

}
