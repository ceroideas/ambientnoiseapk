import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReservesPageRoutingModule } from './my-reserves-routing.module';

import { MyReservesPage } from './my-reserves.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MyReservesPageRoutingModule
  ],
  declarations: [MyReservesPage]
})
export class MyReservesPageModule {}
