import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  lists:any = [];
  local;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public api: ApiService, public route: ActivatedRoute, public navparams: NavparamsService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  	this.local = this.navparams.getParam();
  }

  ngOnInit() {

  	this.api.getListsFront(this.route.snapshot.params.id).subscribe(data=>{
  		this.lists = data;
  	})
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
              this.lists[i] = data;

              let mess = list.users.findIndex(x=>x.user_id == this.user.id) != -1 ? 'Has abandonado la lista' : 'Te has añadido a la lista';
              this.alertCtrl.create({message:mess}).then(a=>{a.present(); setTimeout(()=>{a.dismiss();},3000);});

              l.dismiss();
            },e => {

              l.dismiss();

              this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
            })
          })
        }
      },{
        text:"No"
      },{
        text:"Agregar Invitado",
        handler: ()=> {
          this.alertCtrl.create({message:"Nombre del invitado", inputs: [{
            placeholder:"Nombre y Apellido",
            name: "name",
            type: "text"
          }], buttons: [{
            text:"Aceptar",
            handler: (a)=>{
              
              this.loadingCtrl.create().then(l=>{
                l.present();

                this.api.saveGuest({name:a.name,user_id:this.user.id,list_id:list.id}).subscribe(data=>{
                  this.lists[i] = data;
                  
                  let mess = list.guests.findIndex(x=>x.name == a.name) != -1 ? 'Invitado eliminado de la lista' : 'Invitado añadido a la lista';
                  this.alertCtrl.create({message:mess}).then(a=>{a.present(); setTimeout(()=>{a.dismiss();},3000);});

                  l.dismiss();
                },e => {

                  l.dismiss();

                  this.alertCtrl.create({message:"La lista está llena!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
                })
              })

            }
          },{
            text:"Cancelar"
          }]}).then(a=>{
            a.present();
          })
        }
      }
    ]}).then(a=>a.present());
  }

}
