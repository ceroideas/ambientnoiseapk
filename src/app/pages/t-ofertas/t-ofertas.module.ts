import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TOfertasPageRoutingModule } from './t-ofertas-routing.module';

import { TOfertasPage } from './t-ofertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TOfertasPageRoutingModule
  ],
  declarations: [TOfertasPage]
})
export class TOfertasPageModule {}
