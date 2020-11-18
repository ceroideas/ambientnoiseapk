import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
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

  query;
  timeout;

  constructor(public nav: NavController, public cdr: ChangeDetectorRef, public api: ApiService, public navparams: NavparamsService, public alertCtrl: AlertController) {
    this.list = this.navparams.getParam();
  }

  ngOnInit() {
    this.api.getListUsers(this.list.id).subscribe((data:any)=>{
      this.users = data;
    })
  }

  saveRosterUser(guest,i)
  {
    this.api.saveRosterUser({list_id:this.list.id,user_id:guest.id}).subscribe(data=>{
      this.users.splice(i,1,data);
      let aux = this.users;
      this.users = [];
      setTimeout(()=>{
        this.users = aux;
      },100)
    },e => {
      this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present()});
    })
  }

  searchUsers()
  {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(()=>{
      this.api.filterUsers({list_id:this.list.id,_query:this.query}).subscribe((data:any)=>{
        this.users = data;
      })
    },1000)
  }

  saveUsers()
  {
    this.nav.navigateRoot('local/listas');
  }

}
