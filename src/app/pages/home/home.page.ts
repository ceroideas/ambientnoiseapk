import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
  	slidesPerView: 5.5
  }

  selection;
  ambiente = "Todos";
  musica = "Todos";

  ambientes = [
	"Todos",
	"Discoteca",
	"Cócteles",
	"Irlandés",
	"Karaoke",
	"Cafés",
	"Teterías"
  ];

  tmusica = [
	"Todos",
	"Bachata",
	"Cumbia",
	"Salsa"
  ];

  locales = [
    {name:'Gusto Bistro',location:'Marbella, Málaga',stars:'4.3',bg:'fondo-restaurante-01.jpg'},
    {name:'Bobby Logan',location:'Torre del mar, Málaga',stars:'4.2',bg:'bobby-logan.jpg'},
    {name:'Fury Burguer',location:'Torremolinos, Málaga',stars:'4.1',bg:'burger.jpg'}
  ]

  filter = "Mejor Ahora";

  query;

  constructor(public alert: AlertController, public loading: LoadingController) { }

  ngOnInit() {
  }

  openFilter()
  {
  	this.alert.create({message:"Filtro rápido",inputs:[
  	{
  		label:"Mejor Ahora",
  		type:"radio",
  		name:"quick",
  		value:"Mejor Ahora",
  		checked:this.filter == "Mejor Ahora"
  	},{
  		label:"Destacados",
  		type:"radio",
  		name:"quick",
  		value:"Destacados",
  		checked:this.filter == "Destacados"
  	},{
  		label:"Mejor Valorados",
  		type:"radio",
  		name:"quick",
  		value:"Mejor Valorados",
  		checked:this.filter == "Mejor Valorados"
  	},{
  		label:"Más Cercanos",
  		type:"radio",
  		name:"quick",
  		value:"Más Cercanos",
  		checked:this.filter == "Más Cercanos"
  	},
  	],buttons:[{
  		text:"Aceptar",
  		handler: (data)=>{
  			console.log(data);
  			this.filter = data;
  			this.loading.create().then(l=>{
  				l.present();
  				setTimeout(()=>{
  					l.dismiss();
  				},1000)
  			})
  		}
  	},{
  		text:"Cancelar"
  	}]}).then(a=>{
  		a.present();
  	})
  }

  ionViewDidEnter()
  {
  	let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;
  	(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.bottom = "-"+h+"px";
  }

  changeBottom(e)
  {
  	let parentB = (document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.bottom;
  	let handlerI = document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue;

  	let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;

  	if (parentB != '0px') {
  		(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.bottom = "0";
  		document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}else{

  		(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.bottom = "-"+h+"px";
  		document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
  	}
  }

  select(a)
  {
  	this.selection = a;
  }

  cerrar()
  {
  	this.selection = null;
  }

}
