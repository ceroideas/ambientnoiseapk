import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertasPageRoutingModule } from './ofertas-routing.module';

import { OfertasPage } from './ofertas.page';

import { ComponentModule } from '../../component.module';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    PipesModule,
    OfertasPageRoutingModule
  ],
  declarations: [OfertasPage]
})
export class OfertasPageModule {}
