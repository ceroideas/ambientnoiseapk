import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  fake = localStorage.getItem('fakeUser');

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public alertCtrl: AlertController, public navparams: NavparamsService) { }

  ngOnInit() {
  	this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });
  }

  verGaleria()
  {
    if (this.fake) {return this.fakeAlert();}
    this.navparams.setParam(null);
    // this.nav.navigateForward('/tabs/perfil/galeria/'+this.user.id);
  }

  fakeAlert() {
    this.alertCtrl.create({message:"Función solo válida para usuarios registrados!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
  }

}
