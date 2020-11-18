import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoEventoPageRoutingModule } from './nuevo-evento-routing.module';

import { NuevoEventoPage } from './nuevo-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoEventoPageRoutingModule
  ],
  declarations: [NuevoEventoPage]
})
export class NuevoEventoPageModule {}
