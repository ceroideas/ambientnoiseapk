import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(/*public nav: NavController,*/ public api: ApiService, public events: EventsService) { }

  ngOnInit() {
  	this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });
  }

}
