import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;


  public appPages = [];
  // public labels = ['Política de privacidad', 'Soporte y FAQs'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: EventsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
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
        url: '/tabs/cesta',
        icon: 'clipboard'
      },
      {
        title: 'AJUSTES',
        url: '/tabs/perfil/ajustes',
        icon: 'settings'
      },
      {
        title: 'CONTACTO',
        url: '/contacto',
        icon: 'chatbox'
      },
      {
        title: 'LOGOUT',
        url: '/login',
        icon: 'exit'
      }];
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
        url: '/contacto',
        icon: 'chatbox'
      },
      {
        title: 'LOGOUT',
        url: '/login',
        icon: 'exit'
      }];
    })
  }
}
