import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaSalaPageRoutingModule } from './nueva-sala-routing.module';

import { NuevaSalaPage } from './nueva-sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevaSalaPageRoutingModule
  ],
  declarations: [NuevaSalaPage]
})
export class NuevaSalaPageModule {}
