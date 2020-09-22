import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasPageRoutingModule } from './ofertas-routing.module';

import { OfertasPage } from './ofertas.page';

import { ComponentModule } from '../../component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    OfertasPageRoutingModule
  ],
  declarations: [OfertasPage]
})
export class OfertasPageModule {}
