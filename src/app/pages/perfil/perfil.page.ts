import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  providers: [InAppBrowser]
})
export class PerfilPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  fake = localStorage.getItem('fakeUser');

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public alertCtrl: AlertController, public navparams: NavparamsService, public loading: LoadingController, private iab: InAppBrowser) { }

  ngOnInit() {
  	this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });
  }

  verGaleria()
  {
    if (this.fake) {return this.fakeAlert();}
    this.navparams.setParam(null);
    // this.nav.navigateForward('/tabs/perfil/galeria/'+this.user.id);
  }

  fakeAlert() {
    this.alertCtrl.create({message:"Función solo válida para usuarios registrados!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
  }

  covidPassport()
  {
    if (this.user.covid_passport) {
      this.alertCtrl.create({message:"¿Qué desea hacer?", buttons: [{
        text:"Ver mi pasaporte COVID",
        handler: ()=>{
          // this.iab.create(this.api.baseUrl+'uploads/passports/'+this.user.covid_passport);
          // window.open(this.api.baseUrl+'uploads/passports/'+this.user.covid_passport,'_blank');

          this.api.openFile(this.api.baseUrl+'uploads/passports/'+this.user.covid_passport);
        }
      },{
        text:"Subir nuevo pasaporte COVID",
        handler: ()=>{
          document.getElementById('passport').click();
        }
      },{
        text:"Cancelar"
      }]}).then(a=>a.present());
    }else{
      document.getElementById('passport').click();
    }
  }

  uploadFile(e)
  {
    console.log(e.target.files[0]);
    this.loading.create({message:"Subiendo archivo!"}).then(l=>{
      l.present();

      let file = e.target.files[0];

      let formData = new FormData();

      formData.append("file", file);
      formData.append("id", this.user.id);

      console.log(formData);

      this.api.uploadPassport(formData).subscribe((data:any)=>{
        this.user = data;
        localStorage.setItem('ANuser', JSON.stringify(data));
        l.dismiss();

        this.alertCtrl.create({message:"El archivo ha sido subido"}).then(al=>{al.present(); setTimeout(()=>{al.dismiss()},3000)});
      });

    })
  }

}
