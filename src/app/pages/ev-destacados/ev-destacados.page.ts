import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-ev-destacados',
  templateUrl: './ev-destacados.page.html',
  styleUrls: ['./ev-destacados.page.scss'],
})
export class EvDestacadosPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
  user = JSON.parse(localStorage.getItem('ANuser'));
  eventos:any;

  fake = localStorage.getItem('fakeUser');

  constructor(public api: ApiService, public events: EventsService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.api.getFeaturedEvents().subscribe(data=>{
      this.eventos = data;
    });

    this.events.destroy('restoreCourseEv');
    this.events.subscribe('restoreCourseEv',()=>{
      this.tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
    });
  }

  openInformation(id)
  {
  	if ((document.getElementById('bi-EE'+id) as HTMLElement).offsetHeight > 0) {
      return (document.getElementById('bi-EE'+id) as HTMLElement).style.height = "0px";
    }

    let h = (document.getElementById('inner-EE'+id) as HTMLElement).offsetHeight;

    setTimeout(()=>{
      (document.getElementById('bi-EE'+id) as HTMLElement).style.height = (h + 12)+"px";
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
              this.eventos[i].list = data;

              let mess = list.users.findIndex(x=>x.user_id == this.user.id) != -1 ? 'Has abandonado la lista' : 'Te has añadido a la lista';
              this.alertCtrl.create({message:mess}).then(a=>{a.present();setTimeout(()=>{a.dismiss()},3000);});

              l.dismiss();
            },e => {

              l.dismiss();

              this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present();setTimeout(()=>{a.dismiss()},3000);});
            })
          })
        }
      },{
        text:"No"
      }
    ]}).then(a=>a.present());
  }

}
