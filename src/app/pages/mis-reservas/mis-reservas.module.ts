import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisReservasPageRoutingModule } from './mis-reservas-routing.module';

import { MisReservasPage } from './mis-reservas.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    MisReservasPageRoutingModule
  ],
  declarations: [MisReservasPage]
})
export class MisReservasPageModule {}
