import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoPlatoPageRoutingModule } from './nuevo-plato-routing.module';

import { NuevoPlatoPage } from './nuevo-plato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevoPlatoPageRoutingModule
  ],
  declarations: [NuevoPlatoPage]
})
export class NuevoPlatoPageModule {}
