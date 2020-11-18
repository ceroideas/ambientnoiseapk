import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  slideOpts = {
  	slidesPerView: 5.5
  }

  selection;
  ambiente;
  musica;

  ambientes = [
	// "Todos",
	// "Discoteca",
	// "Cócteles",
	// "Irlandés",
	// "Karaoke",
	// "Cafés",
	// "Teterías"
  ];

  tmusica = [
	// "Todos",
	// "Bachata",
	// "Cumbia",
	// "Salsa"
  ];

  locales = [
    {name:'Gusto Bistro',location:'Marbella, Málaga',stars:'4.3',bg:'fondo-restaurante-01.jpg'},
    {name:'Bobby Logan',location:'Torre del mar, Málaga',stars:'4.2',bg:'bobby-logan.jpg'},
    {name:'Fury Burguer',location:'Torremolinos, Málaga',stars:'4.1',bg:'burger.jpg'}
  ]

  filter = "Mejor Ahora";

  query;

  establishments:any;
  
  music:any;
  ambients:any;

  province:any;
  ocupacion:any;

  range = {lower:20,upper:80};

  provincias;

  buscar;

  page = 1;

  lat = localStorage.getItem('lat');
  lon = localStorage.getItem('lon');

  quickAmbient = null;

  constructor(public alert: AlertController, public loading: LoadingController, public api: ApiService, public events: EventsService, public navparams: NavparamsService, public nav: NavController) { }

  ngOnInit() {

    this.events.destroy('filterEstablishments');
    this.events.subscribe('filterEstablishments',()=>{
      let data = this.navparams.getParam();

      this.ambientes = data.ambientes;
      this.tmusica = data.tmusica;

      this.ambiente = data.ambiente;
      this.musica = data.musica;
      this.ocupacion = data.ocupacion;
      this.range = data.range;

      this.filterEstablishment(false);
    });

    this.api.getEstablishments({province:this.province,ambient:this.ambiente,music:this.musica, lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{
      this.establishments = request.data;
    })

    this.api.getAll().subscribe((data:any)=>{
      this.ambients = data.ambients;
      this.music = data.music;

      for (let i in this.ambients) {
        this.ambientes.push({id:this.ambients[i].id, title:this.ambients[i].title});
      }
      for (let i in this.music) {
        this.tmusica.push({id:this.music[i].id, title:this.music[i].title});
      }
      
    })
  }

  getLocal(l)
  {
    localStorage.setItem('actualLocal',JSON.stringify(l));
  }

  selectQuickAmbient(id)
  {
    this.query = null;
    this.quickAmbient = id;

    this.ambiente = id;
    this.musica = null;
    this.ocupacion = null;
    this.range = {lower:20,upper:80};

    this.api.getEstablishments({province:this.province,ambient:this.ambiente,music:this.musica, lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{
      this.establishments = request.data;
    })
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
    localStorage.removeItem('openCart');
    this.tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  	// let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;
  	(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height = "28px";
  }

  changeBottom(e)
  {
  	let parentB = (document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height;
  	let handlerI = document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue;

  	let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;

  	if (parentB != '28px') {
  		(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height = "28px";
  		document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
  	}else{
  		(document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height = h+"px";
  		document.getElementsByClassName('handlerH')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}
  }

  select(a)
  {
  	this.selection = a;

    setTimeout(()=>{
      let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;
      (document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height = h+"px";
    },100)

  }

  cerrar()
  {
  	this.selection = null;

    setTimeout(()=>{
      let h = (document.getElementsByClassName('information-boxH')[0] as HTMLElement).offsetHeight;
      (document.getElementsByClassName('bottom-informationH')[0] as HTMLElement).style.height = h+"px";
    },100)

    this.filterEstablishment(true);
  }

  passData()
  {
    let data = {province: this.province,establishments: this.establishments, ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica, page: this.page};
    this.navparams.setParam(data);
  }

  timeout;
  openDialog = false;
  goBuscar()
  {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(()=>{

      if (this.buscar) {
        this.api.searchProvinces({busqueda: this.buscar}).subscribe(data=>{
          this.provincias = data;
          this.openDialog = true;

          console.log(data);
        })
      }else{
        this.openDialog = false;
      }
    },1000)
  }

  selectProvince(id,name)
  {
    this.openDialog = false;
    this.buscar = name;
    this.province = id;

    this.filterEstablishment(true);
  }

  filterEstablishment(close = null)
  {
    this.query = null;
    this.quickAmbient = null;
    this.page = 1;
    this.api.getEstablishments({province:this.province,ambient:this.ambiente,music:this.musica,lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{
      this.establishments = request.data;

      if (close) {
        this.changeBottom(null);
      }
    });
  }

  getEstablishments(event)
  {
    this.page+=1;
    this.api.getEstablishments({province:this.province,ambient:this.ambiente,music:this.musica,lat:this.lat, lon:this.lon},this.page).subscribe((request:any)=>{
      this.establishments = this.establishments.concat(request.data);
      
      event.target.complete();

      if (!request.data.length) {
        event.target.disabled = true;
      }
    });
  }

  passFilterData()
  {
    let data = {ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica, page: this.page};
    this.navparams.setParam(data);

    this.nav.navigateForward(['/tabs/home/filtros']);
  }

}
