import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-tabs2',
  templateUrl: './tabs2.page.html',
  styleUrls: ['./tabs2.page.scss'],
})
export class Tabs2Page implements OnInit {

  constructor(public events: EventsService) {
  	this.events.publish('showLocalMenu');
  }

  ngOnInit() {
  }

}
