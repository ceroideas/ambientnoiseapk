import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarResPageRoutingModule } from './pagar-res-routing.module';

import { PagarResPage } from './pagar-res.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagarResPageRoutingModule
  ],
  declarations: [PagarResPage]
})
export class PagarResPageModule {}
