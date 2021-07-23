import { Component, OnInit } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './services/events.service';
import { ApiService } from './services/api.service';
import { SocketService } from './services/socket.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [SocialSharing]
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;


  public appPages = [];
  public extras = [];
  user;
  type = null;
  // public labels = ['Política de privacidad', 'Soporte y FAQs'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: EventsService,
    public socket: SocketService,
    private geolocation: Geolocation,
    private oneSignal: OneSignal,
    private api: ApiService,
    public alertCtrl: AlertController,
    public nav: NavController,
    private socialSharing: SocialSharing,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.statusBar.overlaysWebView(true);
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#a365b8');
      this.splashScreen.hide();

      localStorage.removeItem('closer');

      if (localStorage.getItem('ANuser')) {

        this.user = JSON.parse(localStorage.getItem('ANuser'))
        
        // this.socket.startConnection();

      }

      let watch = this.geolocation.watchPosition(/*{maximumAge: 3000, timeout: 5000, enableHighAccuracy: true}*/);
      watch.subscribe((data:any) => {

        //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
        function calcCrow(lat1, lon1, lat2, lon2) 
        {
          var R = 6371*1000; // km
          var dLat = toRad(lat2-lat1);
          var dLon = toRad(lon2-lon1);
          var lat1:any = toRad(lat1);
          var lat2:any = toRad(lat2);

          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c;
          return d;
        }

        // Converts numeric degrees to radians
        function toRad(Value) 
        {
            return Value * Math.PI / 180;
        }
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude

       let crow = calcCrow(localStorage.getItem('lat'),localStorage.getItem('lon'),data.coords.latitude.toString(),data.coords.longitude.toString());
       // console.log('watchPosition',crow,data);
       if ((crow) > 1) {

         localStorage.setItem('lat',data.coords.latitude.toString());
         localStorage.setItem('lon',data.coords.longitude.toString());

         this.api.getCloser({lat:data.coords.latitude,lon:data.coords.longitude}).subscribe((data:any)=>{
           // console.log(data);
           if (data) {
             localStorage.setItem('closer',JSON.stringify(data.id));

             this.events.publish('activateTactic',data.id);
           }else{

             this.events.publish('desactivateTactic');
             localStorage.removeItem('closer');

           }
         })
       }

       if (localStorage.getItem('actualLocal')) {
         let l = JSON.parse(localStorage.getItem('actualLocal'));

         let localCrow = calcCrow(l.lt,l.ln,data.coords.latitude.toString(),data.coords.longitude.toString());

         // console.log('localCrow',(localCrow/1000));

         this.events.publish('updateDistance',(localCrow/1000));
       }

      });

      this.initializeOnesignal();

      this.api.getUrl().subscribe((data:string)=>{
        // console.log(data);
        localStorage.setItem('share_url',JSON.stringify(data[0]));
        localStorage.setItem('tutorial_text',JSON.stringify(data[1]));

        this.events.publish('tutorial_text');
      })
    });
  }

  ngOnInit() {

    this.pay();

    this.events.subscribe('getCloser',()=>{
      this.api.getCloser({lat:localStorage.getItem('lat'),lon:localStorage.getItem('lon')}).subscribe((data:any)=>{
       // console.log(data);
       if (data) {
         
         localStorage.setItem('closer',JSON.stringify(data.id));

         this.events.publish('activateTactic',data.id);
       }else{
         this.events.publish('desactivateTactic');
         localStorage.removeItem('closer');
        }
      })

      //
    });

    this.geolocation.getCurrentPosition({maximumAge: 3000, timeout: 5000, enableHighAccuracy: true}).then((resp) => {
      localStorage.setItem('lat',resp.coords.latitude.toString());
      localStorage.setItem('lon',resp.coords.longitude.toString());
    }).catch((error) => {
      console.log('Error getting location', error);
    });


    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.events.subscribe('showClientMenu',()=>{
      this.type = 'client';
      this.appPages = [
      {
        title: 'BUSCAR',
        url: '/tabs/home',
        icon: 'search'
      },
      {
        title: 'PERFIL',
        url: '/tabs/perfil',
        icon: 'person'
      },
      {
        title: 'FAVORITOS',
        url: '/tabs/favoritos',
        icon: 'heart'
      },
      {
        title: 'OFERTAS',
        url: '/tabs/ofertas',
        icon: 'pricetags'
      },
      {
        title: 'MIS PEDIDOS',
        url: '/tabs/perfil/pedidos',
        icon: 'clipboard'
      },
      {
        title: 'AJUSTES',
        url: '/tabs/perfil/ajustes',
        icon: 'settings'
      },
      {
        title: 'CONTACTO',
        url: '/tabs/contacto',
        icon: 'chatbox'
      },
      /*{
        title: 'LOGOUT',
        url: '/login',
        icon: 'exit'
      }*/];

      this.extras = [
        {
          title: 'Política de privacidad',
          url: '/tabs/politica'
        },{
          title: 'Soporte y FAQs',
          url: '/tabs/faqs'
        }
      ];
    })

    this.events.subscribe('showLocalMenu',()=>{
      this.type = 'local';
      this.appPages = [
      {
        title: 'PERFIL',
        url: '/local/perfil',
        icon: 'person'
      },
      {
        title: 'MIS LOCALES',
        url: '/local/locales',
        icon: 'navigate'
      },
      {
        title: 'PROMOCIONES',
        url: '/local/eventos',
        icon: 'pricetags'
      },
      {
        title: 'OFERTAS',
        url: '/local/ofertas',
        icon: 'cart'
      },
      {
        title: 'LISTAS',
        url: '/local/listas',
        icon: 'list'
      },
      {
        title: 'PEDIDOS',
        url: '/local/pedidos',
        icon: 'clipboard'
      },
      {
        title: 'CONTACTO',
        url: '/local/contacto',
        icon: 'chatbox'
      },
      /*{
        title: 'LOGOUT',
        url: '/login',
        icon: 'exit'
      }*/];

      this.extras = [
        {
          title: 'Política de privacidad',
          url: '/local/politica'
        },{
          title: 'Soporte y FAQs',
          url: '/local/faqs'
        }
      ];
    })
  }

  logout()
  {
    this.alertCtrl.create({header:"Desea cerrar la sesión?",buttons:[
    {
      text: "Si",
      handler:()=>{
        this.nav.navigateRoot('login');
        localStorage.removeItem('ANuser');
      }
    },{
      text: "No"
    }
    ]}).then(a=>a.present());
  }

  pay()
  {
    // this.api.exampleStripe({
    //   "price": "50",
    //   "card": "4242424242424242",
    //   "exp_m": "12",
    //   "exp_y": "2022",
    //   "cvc": "123",
    // }).subscribe(data=>{
    //   console.log(data);
    // },e=>{
    //   console.log(e);
    // })
  }

  initializeOnesignal()
  {
    this.oneSignal.startInit('e4495339-60e1-4a99-84a7-a2119469b570', '54999905802');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((jsondata) => {
     // do something when notification is received saveOneSignalId
     // console.log('received',jsondata,jsondata.payload.additionalData)
     let data = jsondata.payload.additionalData;

      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      if (this.user.role == 2) {
        switch (data.type) {

          case "like":
            // this.nav.navigateForward('tabs/chat-room');
            this.events.publish('getAprobedAll');
            break;

          case "chat":
            // this.nav.navigateForward('tabs/chat-room/'+data.from_id);
            this.events.publish('getAprobedAll');

            console.log(data.from_id,this.router.url.indexOf('chat-room/'));

            if (data.from_id == localStorage.getItem('actualChat') && this.router.url.indexOf('chat-room/') !== -1) {
              this.oneSignal.clearOneSignalNotifications();
              // .inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            }

            break;
          case "reserve":
            this.nav.navigateForward('tabs/mis-reservas/'+data.establishment_id);
            break;

          case "cart":
            // this.nav.navigateForward('tabs/perfil/carrito');
            this.events.publish('getCart');
            break;
          case "order":
            // this.nav.navigateForward('tabs/perfil/pedidos');
            this.events.publish('getOrders');
            break;
          case "closet":
            // this.nav.navigateForward('tabs/perfil/pedidos');
            this.events.publish('getOrders');
            break;

          case "ocupation":
            this.events.publish('realOcupation')
            break;

          case "local":
            // this.nav.navigateForward('tabs/home/detalles/'+data.establishment_id);
            break;
          
          default:
            // code...
            console.log('notificación por defecto')
            break;
        }
      }
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsondata) => {
      // do something when a notification is opened
      let data = jsondata.notification.payload.additionalData;

      if (this.user.role == 2) {
        switch (data.type) {

          case "like":
            this.nav.navigateForward('tabs/chat-room');
            this.events.publish('getAprobedAll');
            break;

          case "chat":
            this.nav.navigateForward('tabs/chat-room/'+data.from_id);
            this.events.publish('getAprobedAll');
            break;
          case "reserve":
            this.nav.navigateForward('tabs/mis-reservas/'+data.establishment_id);
            break;

          case "cart":
            this.nav.navigateForward('tabs/perfil/carrito');
            this.events.publish('getCart');
            break;
          case "order":
            this.nav.navigateForward('tabs/perfil/pedidos');
            this.events.publish('getOrders');
            break;
          case "closet":
            this.nav.navigateForward('tabs/perfil/pedidos');
            this.events.publish('getOrders');
            break;

          case "ocupation":
            this.events.publish('realOcupation')
            break;

          case "local":
            this.nav.navigateForward('tabs/home/detalles/'+data.establishment_id);
            break;
          
          default:
            // code...
            console.log('notificación por defecto')
            break;
        }
      }
    });

    this.oneSignal.endInit();

    this.oneSignal.getIds().then((ids)=> {
      localStorage.setItem('onesignal_id',ids.userId);

      if (localStorage.getItem('ANuser')) {
        let onesignal_id = localStorage.getItem('onesignal_id');

        this.api.saveOneSignalId({id:this.user.id,onesignal_id:onesignal_id})
        .subscribe(
          data => {console.log('ok');},
          err => {console.log(err);}
        );
      }

    });
  }

  share()
  {
    let m = JSON.parse(localStorage.getItem('share_url'));
    let url;
    if (this.platform.is('ios')) {
      url = m.url_ios;
    }else{
      url = m.url_android;
    }
    this.socialSharing.share(m.message+url, m.subject).then(() => {
      // Success!
      console.log('success');
    }).catch(() => {
      // Error!
      console.log('error');
    });
  }
}
