import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearSalasPageRoutingModule } from './crear-salas-routing.module';

import { CrearSalasPage } from './crear-salas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearSalasPageRoutingModule
  ],
  declarations: [CrearSalasPage]
})
export class CrearSalasPageModule {}
