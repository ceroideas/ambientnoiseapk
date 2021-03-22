import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonSlides, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  providers: [InAppBrowser]
})
export class MapPage implements OnInit {

  slideOpts = {
  	slidesPerView: 1.2,
  	spaceBetween: 20
  }

  selection;
  ambiente = "Todos";
  musica = "Todos";

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

  establishments:any;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('slides') slides: IonSlides;
  map: any;
  places: any;

  ocupacion:any;
  range = {lower:20,upper:80};

  province:any;

  public user = JSON.parse(localStorage.getItem('ANuser'));
  public locations: any[] = [];

  buscar;
  provincias;

  page = 1;

  lat
  lon

  markers:any = [];

  infoWindow = new google.maps.InfoWindow;

  constructor(private geolocation: Geolocation, public api: ApiService, private iab: InAppBrowser, public loading: LoadingController,
    public events: EventsService, public nav: NavController, public navparams: NavparamsService) {
  }

  ngOnInit() {


    this.events.destroy('filterMapEstablishments');
    this.events.subscribe('filterMapEstablishments',()=>{
      let data = this.navparams.getParam();

      this.ambientes = data.ambientes;
      this.tmusica = data.tmusica;
      this.page = 1;

      this.ambiente = data.ambiente;
      // this.establishments = data.establishments;
      this.musica = data.musica;
      this.ocupacion = data.ocupacion;
      this.range = data.range;

      this.filterEstablishment(false);
    });

    let data = this.navparams.getParam();

    this.ambientes = data.ambientes;
    this.tmusica = data.tmusica;
    this.page = data.page;

    this.establishments = data.establishments;

    this.ambiente = data.ambiente;
    this.musica = data.musica;
    this.ocupacion = data.ocupacion;
    this.range = data.range;
    this.province = data.province;
    this.city = data.city;

    console.log(data);
  }

  ionViewDidEnter()
  {
    if (!this.map) {
      this.geolocation.getCurrentPosition().then((resp) => {
        localStorage.setItem('lat',resp.coords.latitude.toString());
        localStorage.setItem('lon',resp.coords.longitude.toString());

        this.lat = resp.coords.latitude.toString()
        this.lon = resp.coords.longitude.toString()
        this.loadMap();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  	// let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;
  	(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height = "28px";

    this.initAutocomplete();
  }

  changeBottom(e)
  {
  	let parentB = (document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height;
  	let handlerI = document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue;

  	let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;

  	if (parentB != '28px') {
  		(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height = "28px";
  		document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
  	}else{

  		(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height = h+"px";
  		document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}
  }

  getLocal(l)
  {
    localStorage.setItem('actualLocal',JSON.stringify(l));
  }

  select(a)
  {
  	this.selection = a;

    setTimeout(()=>{
      let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;
      (document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height = h+"px";
    },100)
  }

  close()
  {
    // this.ambientes = null;
    // this.tmusica = null;
    this.page = 1;
    this.buscar = null;
    this.province = null;
    this.city = null;

    this.ambiente = null;
    // this.establishments = null;
    this.musica = null;
    this.ocupacion = null;
    this.range = {lower:20,upper:80};

    this.filterEstablishment(true);
  }

  /*cargarMas()
  {
    this.changeSlide();

    this.slides.length().then(i=>{
      this.page+=1;
      this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,music:this.musica,lat:this.lat, lon:this.lon},this.page).subscribe((request:any)=>{
        this.establishments = this.establishments.concat(request.data);

        setTimeout(()=>{
          this.slides.slideTo(i-1,0).then(()=>{
            console.log('slide',i);
          })
        },1)


        if (!request.data.length) {

        }

        //

        for (let i in request.data) {
          let e = request.data[i];
          let _marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            icon: {url: (e.marker ? e.marker :'assets/locales.svg'), scaledSize: new google.maps.Size(60, 60)},
            position: new google.maps.LatLng(e.lt, e.ln)
          });
         
          google.maps.event.addListener(_marker, 'click', () => {
            this.infoWindow.setContent(this.getHTMLContent(e,i))
            this.infoWindow.open(this.map, _marker);
            setTimeout(()=>{
              document.querySelectorAll('.button-infowindow').forEach((v)=>{
                console.log(v);
                v.removeEventListener('click',(element)=>{
                  let ds = (element.target as HTMLElement).dataset;
                  localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
                  this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
                });
                v.addEventListener('click', (element)=>{
                  let ds = (element.target as HTMLElement).dataset;
                  localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
                  this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
                })
              })

              document.querySelectorAll('.button-goTo').forEach((v)=>{
                console.log(v);
                v.removeEventListener('click',(element)=>{
                  let ds = (element.target as HTMLElement).dataset;
                  const browser = this.iab.create(
                  'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
                  );
                });
                v.addEventListener('click', (element)=>{
                  let ds = (element.target as HTMLElement).dataset;
                  const browser = this.iab.create(
                  'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
                  );
                })
              })
            },500);
          });

          this.markers.push(_marker);
        }

        //
      });
    })
  }*/

  cerrar()
  {
  	this.selection = null;

    setTimeout(()=>{
      let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;
      (document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.height = h+"px";
    },100)

    this.filterEstablishment(true);
  }

  loadMap(){

    console.log('loadMap');
 
    let latLng = new google.maps.LatLng(localStorage.getItem('lat'), localStorage.getItem('lon'));

    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // let imagen = this.user['geoloc'] == 1 ? "assets/img/contenedor-imagen-perfil-online.png" : "assets/img/contenedor-imagen-perfil.png";

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      // icon: { url : imagen, scaledSize: new google.maps.Size(34, 48) },
      position: this.map.getCenter()
    });

    // console.log(marker);

    for (let i in this.establishments) {
      let e = this.establishments[i];
      let _marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: {url: (e.marker ? e.marker :'assets/locales.svg'), scaledSize: new google.maps.Size(60, 60)},
        position: new google.maps.LatLng(e.lt, e.ln)
      });
     
      google.maps.event.addListener(_marker, 'click', () => {
        this.infoWindow.setContent(this.getHTMLContent(e,i));
        this.infoWindow.open(this.map, _marker);
        setTimeout(()=>{
          document.querySelectorAll('.button-infowindow').forEach((v)=>{
            console.log(v);
            v.removeEventListener('click',(element)=>{
              let ds = (element.target as HTMLElement).dataset;
              localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
              this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
            });
            v.addEventListener('click', (element)=>{
              let ds = (element.target as HTMLElement).dataset;
              localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
              this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
            })
          })

          document.querySelectorAll('.button-goTo').forEach((v)=>{
            console.log(v);
            v.removeEventListener('click',(element)=>{
              let ds = (element.target as HTMLElement).dataset;
              const browser = this.iab.create(
              'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
              );
            });
            v.addEventListener('click', (element)=>{
              let ds = (element.target as HTMLElement).dataset;
              const browser = this.iab.create(
              'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
              );
            })
          })
        },500);
      });

      this.markers.push(_marker);

    }

    this.slides.getActiveIndex().then(i=>{
      let a = this.establishments[i];

      this.map.setCenter({lat: parseFloat(a.lt),lng: parseFloat(a.ln)});
    })

    console.log(this.markers);
   
    // let content = JSON.parse(localStorage.getItem('user'))['name'];
   
    // this.addInfoWindow(marker, content);

    // for (var i = 0; i < this.locations.length; i++) {

    //   let imagen = this.locations[i].followed.geoloc == 1 ? "assets/img/contenedor-imagen-perfil-online.png" : "assets/img/contenedor-imagen-perfil.png";

    //   let marker = new google.maps.Marker({
    //     map: this.map,
    //     animation: google.maps.Animation.DROP,
    //     icon: { url : imagen, scaledSize: new google.maps.Size(34, 48) },
    //     position: new google.maps.LatLng(this.locations[i].followed.lat, this.locations[i].followed.lon)
    //   });

    //   console.log(marker.getPosition());

    //   let infoWindow = new google.maps.InfoWindow({
    //     content: this.locations[i].followed.name+': '+this.locations[i].followed.address
    //   });
     
    //   google.maps.event.addListener(marker, 'click', () => {
    //     infoWindow.open(this.map, marker);
    //   });
    // }
  }

  reload()
  {
    this.loading.create().then(l=>{
      l.present();
      this.geolocation.getCurrentPosition().then((resp) => {
        l.dismiss();
        localStorage.setItem('lat',resp.coords.latitude.toString());
        localStorage.setItem('lon',resp.coords.longitude.toString());

        this.lat = resp.coords.latitude.toString()
        this.lon = resp.coords.longitude.toString()
        this.loadMap();
      }).catch((error) => {
        l.dismiss();
        console.log('Error getting location', error);
      });
    })
  }

  changeSlide()
  {
    this.slides.getActiveIndex().then(i=>{
      console.log(i);
      if (this.map) {
        let a = this.establishments[i];

        this.map.setCenter({lat: parseFloat(a.lt),lng: parseFloat(a.ln)});
      }
    })
  }

  filterEstablishment(close = null)
  {
    this.page = 1;
    console.log('filter')
    this.api.getEstablishments({id:this.user.id,province:this.province,city:this.city,ambient:this.ambiente,music:this.musica,lat:this.lat, lon:this.lon},this.page).subscribe((request:any)=>{
      
      let data = request.data;

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

      this.establishments = data;

      for(let i in this.markers) {
        this.markers[i].setMap(null);
      }

      for (let i in this.establishments) {
        let e = this.establishments[i];
        let _marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          icon: {url: (e.marker ? e.marker :'assets/locales.svg'), scaledSize: new google.maps.Size(60, 60)},
          position: new google.maps.LatLng(e.lt, e.ln)
        });
       
        google.maps.event.addListener(_marker, 'click', () => {
          this.infoWindow.setContent(this.getHTMLContent(e,i));
          this.infoWindow.open(this.map, _marker);
          setTimeout(()=>{
            document.querySelectorAll('.button-infowindow').forEach((v)=>{
              console.log(v);
              v.removeEventListener('click',(element)=>{
                let ds = (element.target as HTMLElement).dataset;
                localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
                this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
              });
              v.addEventListener('click', (element)=>{
                let ds = (element.target as HTMLElement).dataset;
                localStorage.setItem('actualLocal',JSON.stringify(this.establishments[i]));
                this.nav.navigateForward('/tabs/home/detalles/'+ds.local_id);
              })
            })

            document.querySelectorAll('.button-goTo').forEach((v)=>{
              console.log(v);
              v.removeEventListener('click',(element)=>{
                let ds = (element.target as HTMLElement).dataset;
                const browser = this.iab.create(
                'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
                );
              });
              v.addEventListener('click', (element)=>{
                let ds = (element.target as HTMLElement).dataset;
                const browser = this.iab.create(
                'https://www.google.com/maps/dir/'+localStorage.getItem('lat')+','+localStorage.getItem('lon')+'/'+ds.lat+','+ds.lon+'/'
                );
              })
            })
          },500);
        });

        this.markers.push(_marker);
      }

      this.slides.getActiveIndex().then(i=>{
        let a = this.establishments[i];

        this.map.setCenter({lat: parseFloat(a.lt),lng: parseFloat(a.ln)});
      })

      if (close) {
        this.changeBottom(null);
      }
    });
  }

  passFilterData()
  {
    let data = {ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica};
    this.navparams.setParam(data);

    this.nav.navigateForward(['/tabs/home/filtros']);
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
    (document.querySelector('#searchM') as HTMLInputElement).blur();

    this.openDialog = false;
    this.buscar = name;
    this.province = id;

    this.filterEstablishment(true);
  }

  getHTMLContent(e,i)
  {
    let html = `<div style="color: #000; text-align: center;">
    <h5 style="margin-top: 0"> ${e.title} </h5>
    <span style="background-image: url(${e.avatar})" class="logo-restaurante-map tactic"></span>
    <br>
    <button class="button-infowindow" data-local_id="${e.id}" data-index="${i}">Acceder</button></div>
    <br>
    <button class="button-goTo" data-lat="${e.lt}" data-lon="${e.ln}" data-index="${i}">Cómo llegar</button></div>`;
    return html;
  }


  goTo(e,a)
  {
    e.stopPropagation();
    e.preventDefault();
    this.map.setCenter({lat: parseFloat(a.lt),lng: parseFloat(a.ln)});
  }


















  /**/

  /**/

  autocomplete
  latlng:any = {lat:null,lng:null};

  initAutocomplete()
  {
    var geocoder = new google.maps.Geocoder;
    
    var input = document.getElementById('searchM');
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
