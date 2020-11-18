import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TOfertasPageRoutingModule } from './t-ofertas-routing.module';

import { TOfertasPage } from './t-ofertas.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    TOfertasPageRoutingModule
  ],
  declarations: [TOfertasPage]
})
export class TOfertasPageModule {}
