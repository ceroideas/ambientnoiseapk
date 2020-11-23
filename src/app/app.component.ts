import { Component, OnInit } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './services/events.service';
import { ApiService } from './services/api.service';
import { SocketService } from './services/socket.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;


  public appPages = [];
  public extras = [];
  user;
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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (localStorage.getItem('ANuser')) {

        this.user = JSON.parse(localStorage.getItem('ANuser'))
        
        // this.socket.startConnection();

      }

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data:any) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude

       this.api.getCloser({lat:data.coords.latitude,lon:data.coords.longitude}).subscribe((data:any)=>{
         console.log(data);
         if (data) {
           localStorage.setItem('closer',JSON.stringify(data.id));

           this.events.publish('activateTactic',data.id);
         }else{
           localStorage.removeItem('closer');

         }
       })
      });

      this.initializeOnesignal();
    });
  }

  ngOnInit() {

    this.geolocation.getCurrentPosition().then((resp) => {
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

  initializeOnesignal()
  {
    this.oneSignal.startInit('e4495339-60e1-4a99-84a7-a2119469b570', '54999905802');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received saveOneSignalId
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsondata) => {
      // do something when a notification is opened
      // if (jsondata.notification.payload.additionalData.type == 1) {
      //   // this.verGanadores();
      // }
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
}
