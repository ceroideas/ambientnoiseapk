import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { OcupacionPage } from '../ocupacion/ocupacion.page';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.page.html',
  styleUrls: ['./locales.page.scss'],
})
export class LocalesPage implements OnInit {

  constructor(public modal: ModalController, public nav: NavController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: OcupacionPage,
      cssClass: 'semitransp'
    });
    return await modal.present();
  }

}
