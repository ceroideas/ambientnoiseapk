import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

import { Keyboard } from '@ionic-native/keyboard/ngx';

declare var google;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [Keyboard]
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

  range = {lower:null,upper:null};

  provincias;

  buscar;

  page = 1;

  lat = localStorage.getItem('lat');
  lon = localStorage.getItem('lon');

  quickAmbient = null;

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(
    private cdr: ChangeDetectorRef,
    private keyboard: Keyboard, public alert: AlertController, public loading: LoadingController, public api: ApiService, public events: EventsService, public navparams: NavparamsService, public nav: NavController) { }

  ngOnInit() {

    this.events.destroy('updateLocal');
    this.events.subscribe('updateLocal',(local)=>{

      let i = this.establishments.findIndex(x=>x.id == local.id);
      this.establishments[i] = local;

    });

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

    this.api.getEstablishments({id:this.user.id, province:this.province,city:this.city,ambient:this.ambiente,range:this.range,music:this.musica, lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{

      let data = request.data;

      if (request._) {

          for(let i = 1; i < data.length; i++)
          {
              for(let j = 0; j < data.length-i; j++)
              {
                  if (request.type == 'desc') {
                      
                      if(parseInt(data[j][request.order]) < parseInt(data[j+1][request.order]))
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }

                  }else{

                      if(parseInt(data[j][request.order]) > parseInt(data[j+1][request.order]))
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }
                  }
              }
          }
      }

      console.log(request.order,data);

      this.establishments = data;

      this.cdr.detectChanges();
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

  selectQuickAmbient(id, close = null)
  {
    if (id == null) {
      this.ambiente = null;
      this.quickAmbient = null;
      this.buscar = null;
      (document.querySelector('#searchH') as HTMLInputElement).value = "";
    }else{
      if (this.ambiente == id) {
        this.ambiente = null;
        this.quickAmbient = null;
      }else{
        this.ambiente = id;
        this.quickAmbient = id;
      }
    }
    this.filter = "Mejor Ahora";
    this.query = null;
    this.province = null;
    this.city = null;

    this.musica = null;
    this.ocupacion = null;
    this.range = {lower:null,upper:null};

    this.loading.create().then(l=>l.present());

    this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,range:this.range,music:this.musica, lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{
      let data = request.data;

      this.loading.dismiss();

      if (request._) {

          for(let i = 1; i < data.length; i++)
          {
              for(let j = 0; j < data.length-i; j++)
              {
                  if (request.type == 'desc') {
                      
                      if(data[j][request.order] < data[j+1][request.order])
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }

                  }else{

                      if(data[j][request.order] > data[j+1][request.order])
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }
                  }
              }
          }
      }

      console.log(request.order,data);

      this.establishments = data;

      this.cdr.detectChanges();

      if (close) {
        this.changeBottom(null);
      }
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

        this.ambiente = null;
        this.musica = null;
        this.ocupacion = null;
        this.range = {lower:null,upper:null};
  			this.filter = data;

  			console.log(data);
  			this.loading.create().then(l=>{
  				l.present();
          this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,range:this.range,music:this.musica, lat:this.lat, lon:this.lon, quick:data},1).subscribe((request:any)=>{
  					l.dismiss();
            let data = request.data;

            if (request._) {

                for(let i = 1; i < data.length; i++)
                {
                    for(let j = 0; j < data.length-i; j++)
                    {
                        if (request.type == 'desc') {
                            
                            if(parseInt(data[j][request.order]) < parseInt(data[j+1][request.order]))
                            {
                                let k = data[j+1];

                                data[j+1] = data[j];

                                data[j] = k;
                            }

                        }else{

                            if(parseInt(data[j][request.order]) > parseInt(data[j+1][request.order]))
                            {
                                let k = data[j+1];

                                data[j+1] = data[j];

                                data[j] = k;
                            }
                        }
                    }
                }
            }

            console.log(request.order,data);

            this.establishments = data;

            this.cdr.detectChanges();
          })
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

    this.initAutocomplete();
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
    let data = {province: this.province, city: this.city, establishments: this.establishments, ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica, page: this.page};
    this.navparams.setParam(data);
  }

  timeout;
  openDialog = false;

  autocomplete;
  latlng:any = {lat:null,lng:null};

  goBuscar()
  {
    // clearTimeout(this.timeout);
    // this.timeout = setTimeout(()=>{

    //   if (this.buscar) {
    //     this.api.searchProvinces({busqueda: this.buscar}).subscribe(data=>{
    //       this.provincias = data;
    //       this.openDialog = true;

    //       console.log(data);
    //     })
    //   }else{
    //     this.openDialog = false;
    //   }
    // },1000)
  }

  selectProvince(id,name)
  {
    (document.querySelector('#searchH') as HTMLInputElement).blur();

    this.openDialog = false;
    this.buscar = name;
    this.province = id;

    this.filterEstablishment(true);
  }

  filterEstablishment(close = null)
  {
    this.establishments = [];
    this.query = null;
    this.quickAmbient = null;
    this.page = 1;
    this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,ocupacion:this.ocupacion,range:this.range,music:this.musica,lat:this.lat, lon:this.lon},1).subscribe((request:any)=>{
      let data = request.data;

      if (request._) {

          for(let i = 1; i < data.length; i++)
          {
              for(let j = 0; j < data.length-i; j++)
              {
                  if (request.type == 'desc') {
                      
                      if(parseInt(data[j][request.order]) < parseInt(data[j+1][request.order]))
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }

                  }else{

                      if(parseInt(data[j][request.order]) > parseInt(data[j+1][request.order]))
                      {
                          let k = data[j+1];

                          data[j+1] = data[j];

                          data[j] = k;
                      }
                  }
              }
          }
      }

      this.establishments = data;

      this.cdr.detectChanges();

      if (close) {
        this.changeBottom(null);
      }
    });
  }

  // getEstablishments(event)
  // {
  //   this.page+=1;
  //   this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,ocupacion:this.ocupacion,range:this.range,music:this.musica,lat:this.lat, lon:this.lon},this.page).subscribe((request:any)=>{
  //     this.establishments = this.establishments.concat(request.data);
      
  //     event.target.complete();

  //     if (!request.data.length) {
  //       event.target.disabled = true;
  //     }
  //   });
  // }

  passFilterData()
  {
    let data = {id:this.user.id,ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica, page: this.page};
    this.navparams.setParam(data);

    this.nav.navigateForward(['/tabs/home/filtros']);
  }

  closeKeyboard(event) {
    if (event.key === "Enter") 
      this.keyupEnter();
  }

  keyupEnter() {
    this.keyboard.hide();
  }








  /**/

  initAutocomplete()
  {
    var geocoder = new google.maps.Geocoder;
    
    var input = document.getElementById('searchH');
    var countryRestrict = {'country': ['es','it']};
    var options = {
      types: ['(cities)']
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.autocomplete.setComponentRestrictions(
          {'country': ['es', 'it']});

    let fillInAddress = ()=> {
      // Get the place details from the autocomplete object.
      var arr = this.autocomplete.getPlace();
      console.log(arr);

      this.latlng = {lat:arr.geometry.location.lat(),lng:arr.geometry.location.lng()};

      geocoder.geocode({'location': this.latlng}, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              
              // this.address = results[0].formatted_address;
              
              this.getAddress(results);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });

    }

    this.autocomplete.addListener('place_changed', fillInAddress);
  }

  city:string;

  getAddress(arr)
  {
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        var addressType = arr[i].types[0];
        if (addressType) {
            if (addressType == 'locality') {
              // console.log(arr[i].address_components[0].short_name);
              this.city = arr[i].address_components[0].long_name;
              this.province = arr[i].address_components[1].long_name;

              console.log(this.city);
              console.log(this.province);
            }else if(addressType == 'administrative_area_level_2'){
              this.province = arr[i].address_components[0].long_name;

              console.log(this.province);
            }else if(addressType == 'administrative_area_level_4'){
              this.city = arr[i].address_components[0].long_name;

              console.log(this.city);
            }
        }
    }

    this.filterEstablishment(true);
  }

}
