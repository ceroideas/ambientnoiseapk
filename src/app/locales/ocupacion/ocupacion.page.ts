import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.page.html',
  styleUrls: ['./ocupacion.page.scss'],
})
export class OcupacionPage implements OnInit {

  @Input() ocupation: string;
  @Input() id: string;

  // ocupacion = 0;

  constructor(public modal: ModalController, public api: ApiService, public events: EventsService) { }

  ngOnInit() {
  }

  saveOcupation()
  {
  	this.api.saveOcupation({id:this.id,ocupation:this.ocupation}).subscribe(data=>{
  		this.modal.dismiss();
  		this.events.publish('reloadLocals');
  	});

  }

}
