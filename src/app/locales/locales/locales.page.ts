import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController, LoadingController } from '@ionic/angular';
import { OcupacionPage } from '../ocupacion/ocupacion.page';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.page.html',
  styleUrls: ['./locales.page.scss'],
})
export class LocalesPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));
  locales:any = [];

  page = 1;

  constructor(public modal: ModalController, public nav: NavController, public api: ApiService, public events: EventsService, public alert: AlertController,
    public loading: LoadingController, public navparams: NavparamsService) { }

  ngOnInit() {

    if (localStorage.getItem('fixMargin')) {
      this.api.fixMargin();
    }
    
    this.getMyStablishments();

    this.events.destroy('reloadLocals');
    this.events.subscribe('reloadLocals',()=>{
      this.locales = [];
      this.page = 1;
       this.getMyStablishments();
    });
  }
  getMyStablishments(event = null)
  {
    this.api.getMyStablishments(this.user.id, this.page).subscribe((data:any)=>{
      this.locales = this.locales.concat(data.data);
      
      if (event) {
        event.target.complete();

        if (!data.length) {
          event.target.disabled = true;
        }
      }
    })
  }

  getMoreLocals(event)
  {
    this.page+=1;
    this.getMyStablishments(event);
  }

  editLocal(l)
  {
    let data = {type:'edit-local',data:l};
    this.navparams.setParam(data);
    this.nav.navigateForward('local/locales/nuevo');
  }

  clearNv()
  {
    this.navparams.setParam(null);
  }

  async presentModal(id,o) {
    const modal = await this.modal.create({
      component: OcupacionPage,
      cssClass: 'semitransp',
      componentProps: {
        'ocupation': o,
        'id': id
      }
    });
    return await modal.present();
  }

  deleteLocal(id)
  {
    this.alert.create({message:"Desea borrar el local seleccionado? Esto borrará ofertas, eventos y listas vinculad@s a éste local", buttons:[{text:"Si, borrar", handler:()=>{
      this.loading.create().then(l=>{
        l.present();

        this.api.deleteLocal(id).subscribe(data=>{
          l.dismiss();
          this.locales = [];
          this.page = 1;
          this.getMyStablishments();
        })
      })
    }},{text:"Cancelar"}]}).then(a=>{a.present()});
  }

  verSalas(l)
  {
    // this.navparams.setParam(l);
    this.nav.navigateForward('/local/locales/salas/'+l.id);
  }

}
