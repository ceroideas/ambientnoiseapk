import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-l-eventos',
  templateUrl: './l-eventos.page.html',
  styleUrls: ['./l-eventos.page.scss'],
})
export class LEventosPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));

  allEvents:any = [];
  page = 1;

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public loading: LoadingController, public alert: AlertController) { }

  ngOnInit() {
    this.getMyEvents();

    this.events.destroy('reloadLocals');
    this.events.subscribe('reloadLocals',()=>{
      this.page = 1;
      this.getMyEvents();
    });
    this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });
  }

  getMyEvents(event = null)
  {
    this.api.getMyEvents(this.user.id,this.page).subscribe((data:any)=>{
      // this.allEvents = this.allEvents.concat(data.data);
      this.allEvents = data.data;
      
      if (event) {
        event.target.complete();

        if (!data.length) {
          event.target.disabled = true;
        }
      }
    })
  }

  getMoreEvents(event)
  {
    this.page+=1;
    this.getMyEvents(event);
  }


  openInformation(id)
  {
  	if ((document.getElementById('bi-'+id) as HTMLElement).offsetHeight > 0) {
  		return (document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";
  	}
  	(document.getElementById('bi-'+id) as HTMLElement).style.height = 'fit-content';
  	let h = (document.getElementById('bi-'+id) as HTMLElement).offsetHeight;

  	(document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";

  	setTimeout(()=>{
  		(document.getElementById('bi-'+id) as HTMLElement).style.height = h+"px";
  	},10)

  }

  deleteEvent(id)
  {
    this.alert.create({message:"Desea borrar el evento seleccionado?", buttons:[{text:"Si, borrar", handler:()=>{
      this.loading.create().then(l=>{
        l.present();

        this.api.deleteEvent(id).subscribe(data=>{
          l.dismiss();
          this.allEvents = [];
          this.page = 1;
          this.getMyEvents();
        })
      })
    }},{text:"Cancelar"}]}).then(a=>{a.present()});
  }

}
