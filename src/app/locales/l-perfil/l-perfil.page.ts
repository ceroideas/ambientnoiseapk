import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-l-perfil',
  templateUrl: './l-perfil.page.html',
  styleUrls: ['./l-perfil.page.scss'],
})
export class LPerfilPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));
  locals;

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public alert: AlertController, public navparams: NavparamsService) { }

  ngOnInit() {
  	this.events.destroy('updateUser');
    this.events.subscribe('updateUser',()=>{
      this.user = JSON.parse(localStorage.getItem('ANuser'));
    });

    this.api.getMyStablishments(this.user.id,1).subscribe((data:any)=>{
      this.locals = data.data;
    })
  }

  openCart()
  {
    let inputs = [];

    for (let i in this.locals)
    {
      inputs.push({name:'local',type:'radio',label:this.locals[i].title,value:this.locals[i].id})
    }

    this.alert.create({message:"Elija el local donde ver la carta", inputs: inputs, buttons: [{
      text:"Siguiente",
      handler: (a)=>{
        console.log(a);
        
        localStorage.setItem('actualRestaurant',JSON.stringify(this.locals.find(x=>x.id==a)));

        this.nav.navigateForward('local/perfil/carta/'+a);

      }
    },{
      text:"Cancelar"
    }]}).then(a=>{
      a.present();
    })
  }

  openReservas()
  {
    let inputs = [];

    for (let i in this.locals)
    {
      inputs.push({name:'local',type:'radio',label:this.locals[i].title,value:this.locals[i].id})
    }

    this.alert.create({message:"Elija el local donde ver las reservas", inputs: inputs, buttons: [{
      text:"Siguiente",
      handler: (a)=>{
        console.log(a);
        
        localStorage.setItem('actualRestaurant',JSON.stringify(this.locals.find(x=>x.id==a)));

        this.nav.navigateForward('local/perfil/reservas/'+a);

      }
    },{
      text:"Cancelar"
    }]}).then(a=>{
      a.present();
    })
  }

  openGallery()
  {
    let inputs = [];

    for (let i in this.locals)
    {
      inputs.push({name:'local',type:'radio',label:this.locals[i].title,value:this.locals[i].id})
    }

    this.alert.create({message:"Elija el local donde ver la galería", inputs: inputs, buttons: [{
      text:"Siguiente",
      handler: (a)=>{
        console.log(a);

        this.navparams.setParam({type:'local',id:a,user:this.user, self: true});

        this.nav.navigateForward('local/perfil/galeria');
        // localStorage.setItem('actualRestaurant',JSON.stringify(this.locals.find(x=>x.id==a)));
      }
    },{
      text:"Cancelar"
    }]}).then(a=>{
      a.present();
    })
  }

}
