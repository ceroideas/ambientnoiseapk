import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  local = JSON.parse(localStorage.getItem('actualLocal'));
  user = JSON.parse(localStorage.getItem('ANuser'));

  allEvents:any;

  constructor(public nav: NavController, public api: ApiService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.api.getEvents(this.local.id).subscribe(data=>{
      this.allEvents = data;
    })
  }

  openInformation(id)
  {
  	if ((document.getElementById('bi-'+id) as HTMLElement).offsetHeight > 0) {
  		return (document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";
  	}

  	let h = (document.getElementById('inner-'+id) as HTMLElement).offsetHeight;

  	setTimeout(()=>{
  		(document.getElementById('bi-'+id) as HTMLElement).style.height = (h + 6)+"px";
  	},10)

  }

  addGuess(list,i)
  {
    let mess = list.users.findIndex(x=>x.user_id == this.user.id) != -1 ? 'Desea abandonar la lista?' : 'Desea añadirse a la lista?';
    this.alertCtrl.create({message:mess, buttons: [
      {
        text:"Si",
        handler: ()=> {
          this.loadingCtrl.create().then(l=>{
            l.present();

            this.api.addGuess({list_id:list.id,user_id:this.user.id}).subscribe(data=>{
              this.allEvents[i].list = data;

              let mess = list.users.findIndex(x=>x.user_id == this.user.id) != -1 ? 'Has abandonado la lista' : 'Te has añadido a la lista';
              this.alertCtrl.create({message:mess}).then(a=>{a.present()});

              l.dismiss();
            },e => {

              l.dismiss();

              this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present()});
            })
          })
        }
      },{
        text:"No"
      }
    ]}).then(a=>a.present());
  }

}
