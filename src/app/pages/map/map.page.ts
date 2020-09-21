import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
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

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: any;

  public user;
  public locations: any[] = [];

  constructor(private geolocation: Geolocation) {
  }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    if (!this.map) {
      this.geolocation.getCurrentPosition().then((resp) => {
        localStorage.setItem('lat',resp.coords.latitude.toString());
        localStorage.setItem('lon',resp.coords.longitude.toString());
        this.loadMap();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  	let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;
  	(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.bottom = "-"+h+"px";
  }

  changeBottom(e)
  {
  	let parentB = (document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.bottom;
  	let handlerI = document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue;

  	let h = (document.getElementsByClassName('information-box1')[0] as HTMLElement).offsetHeight;

  	if (parentB != '0px') {
  		(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.bottom = "0";
  		document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}else{

  		(document.getElementsByClassName('bottom-information1')[0] as HTMLElement).style.bottom = "-"+h+"px";
  		document.getElementsByClassName('handler1')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
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

  loadMap(){
 
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

    console.log(marker);
   
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

}
