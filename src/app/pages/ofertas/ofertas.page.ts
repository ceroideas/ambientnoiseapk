import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
  ofertas:any;

  constructor(public api: ApiService, public events: EventsService) { }

  ngOnInit() {
  	this.api.getFeaturedOffers().subscribe(data=>{
      this.ofertas = data;
    });

    this.events.destroy('restoreCourseOf');
    this.events.subscribe('restoreCourseOf',()=>{
      this.tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
    });
  }

}
