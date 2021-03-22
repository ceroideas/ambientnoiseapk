import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.page.html',
  styleUrls: ['./lista-detalles.page.scss'],
})
export class ListaDetallesPage implements OnInit {

  list;

  users = [
  // {name:"Jorge Solano"},
  // {name:"Illya Alvarado"},
  // {name:"Cesar Gutierrez"},
  // {name:"Karla Arteta"},
  // {name:"Ibai Llanos"}
  ];

  guests = [];

  query;
  timeout;

  listLogo = localStorage.getItem('listLogo');

  constructor(public nav: NavController, public cdr: ChangeDetectorRef, public api: ApiService, public navparams: NavparamsService, public alertCtrl: AlertController, public events: EventsService) {
    this.list = this.navparams.getParam();
  }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers()
  {
    this.api.getListUsers(this.list.id).subscribe((data:any)=>{
      this.users = data[0];
      this.guests = data[1];
      this.events.publish('reloadLists');
    })
  }
  saveRosterUser(guest,i)
  {
    this.api.saveRosterUser({list_id:this.list.id,user_id:guest.id}).subscribe(data=>{

      this.users.splice(i,1,data[0]);
      let aux = this.users;
      this.users = [];
      setTimeout(()=>{
        this.users = aux;
      },100)
      this.guests = data[1];

      this.events.publish('reloadLists');

    },e => {
      this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present();setTimeout(()=>{a.dismiss()},2000);});
    })
  }

  searchUsers()
  {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(()=>{
      this.api.filterUsers({list_id:this.list.id,_query:this.query}).subscribe((data:any)=>{
        this.users = data[0];
        this.guests = data[1];
      })
    },1000)
  }

  removeGuest(guest)
  {
    this.alertCtrl.create({message:"Desea eliminar al invitado de la lista?", buttons:[{
      text:"Si",
      handler:()=>{
        this.api.saveGuest({name:guest.name,user_id:guest.host_id,list_id:guest.roster_id}).subscribe(data=>{ 
          let mess = 'Invitado eliminado de la lista';
          this.alertCtrl.create({message:mess}).then(a=>{a.present();setTimeout(()=>{a.dismiss()},2000);});

          this.getListUsers();
        })
      }
    },{
      text:"No"
    }]}).then(a=>a.present());
  }

  saveUsers()
  {
    this.nav.navigateRoot('local/listas');
  }

  markAssist(guest,i)
  {

    this.alertCtrl.create({message:"Desea marcar al invitado como asistente?", buttons:[{
      text:"Si",
      handler:()=>{
        /**/
        this.api.saveStatusAssist({id:guest.id}).subscribe(data=>{

          this.users.splice(i,1,data);
          let aux = this.users;
          this.users = [];
          setTimeout(()=>{
            this.users = aux;
          },100)

        });
        /**/
      }
    },{
      text:"No"
    }]}).then(a=>a.present());

  }

  markAssistG(guest,i)
  {
    console.log(guest);
    this.alertCtrl.create({message:"Desea marcar al invitado como asistente?", buttons:[{
      text:"Si",
      handler:()=>{
        /**/
        this.api.saveStatusAssistG({id:guest.id}).subscribe((data:any)=>{

          this.guests = data;

        });
        /**/
      }
    },{
      text:"No"
    }]}).then(a=>a.present());
  }

}
