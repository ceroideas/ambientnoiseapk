import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LOfertasPageRoutingModule } from './l-ofertas-routing.module';

import { LOfertasPage } from './l-ofertas.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LOfertasPageRoutingModule
  ],
  declarations: [LOfertasPage]
})
export class LOfertasPageModule {}
