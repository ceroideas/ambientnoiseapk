import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));

  lists:any = [];
  page = 1;

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public loading: LoadingController, public alert: AlertController, public navparams: NavparamsService) { }

  ngOnInit() {
  	this.getLists();

    this.events.destroy('reloadLists');
    this.events.subscribe('reloadLists',()=>{
      this.page = 1;
      this.getLists();
    });
  }

  getLists(event = null)
  {
    this.api.getLists(this.user.id,this.page).subscribe((data:any)=>{
      this.lists = this.lists.concat(data.data);

      if (event) {
        event.target.complete();

        if (!data.length) {
          event.target.disabled = true;
        }
      }
    })
  }

  getMoreLists(event)
  {
    this.page+=1;
    this.getLists(event);
  }

  deleteList(id)
  {
    this.alert.create({message:"Desea borrar la lista seleccionada?", buttons:[{text:"Si, borrar", handler:()=>{
      this.loading.create().then(l=>{
        l.present();

        this.api.deleteList(id).subscribe(data=>{
          l.dismiss();
          this.lists = [];
          this.page = 1;
          this.getLists();
        })
      })
    }},{text:"Cancelar"}]}).then(a=>{a.present()});
  }

  getList(l)
  {
    this.navparams.setParam(l);
    this.nav.navigateForward('local/listas/lista-detalles');
  }

}
