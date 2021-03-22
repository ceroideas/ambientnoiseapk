import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagarRPageRoutingModule } from './pagar-r-routing.module';

import { PagarRPage } from './pagar-r.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagarRPageRoutingModule
  ],
  declarations: [PagarRPage]
})
export class PagarRPageModule {}
