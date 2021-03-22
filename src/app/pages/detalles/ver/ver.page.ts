import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  @Input() plato:any;

  fake = localStorage.getItem('fakeUser');

  constructor(public events: EventsService, public modal: ModalController) { }

  ngOnInit() {
  }

  addToCart()
  {
  	this.events.publish('addToCart', this.plato);
  	this.modal.dismiss();
  }

}
