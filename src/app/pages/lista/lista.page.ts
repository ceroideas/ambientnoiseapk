import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NavparamsService } from '../../services/navparams.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  providers: [InAppBrowser]
})
export class ListaPage implements OnInit {

  lists:any = [];
  local;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public api: ApiService, public route: ActivatedRoute, public navparams: NavparamsService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, private iab: InAppBrowser) {
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

  covidPassport(id,guess)
  {
    if (guess.covid_passport) {
      this.alertCtrl.create({message:"¿Qué desea hacer?", buttons: [{
        text:"Ver pasaporte COVID de invitado",
        handler: ()=>{
          this.iab.create(this.api.baseUrl+'uploads/passports/'+guess.covid_passport);
        }
      },{
        text:"Subir nuevo pasaporte COVID",
        handler: ()=>{
          document.getElementById('passport-'+id).click();
        }
      },{
        text:"Cancelar"
      }]}).then(a=>a.present());
    }else{
      document.getElementById('passport-'+id).click();
    }
  }

  uploadFile(e,id)
  {
    console.log(e.target.files[0]);
    this.loadingCtrl.create({message:"Subiendo archivo!"}).then(l=>{
      l.present();

      let file = e.target.files[0];

      let formData = new FormData();

      formData.append("file", file);
      formData.append("id", id);
      formData.append("guest", "1");

      console.log(formData);

      this.api.uploadPassport(formData).subscribe((data:any)=>{
        this.api.getListsFront(this.route.snapshot.params.id).subscribe(data=>{
          this.lists = data;
        });
        l.dismiss();

        this.alertCtrl.create({message:"El archivo ha sido subido"}).then(al=>{al.present(); setTimeout(()=>{al.dismiss()},3000)});
      });

    })
  }
}
