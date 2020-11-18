import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { EventsService } from './services/events.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { OneSignal } from '@ionic-native/onesignal/ngx';

const config: SocketIoConfig = { url: 'http://bulldogames.com:9000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule
  ],
  providers: [
    EventsService,
    StatusBar,
    SplashScreen,
    Geolocation,
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
