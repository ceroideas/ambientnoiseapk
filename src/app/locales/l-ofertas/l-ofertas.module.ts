import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LOfertasPageRoutingModule } from './l-ofertas-routing.module';

import { LOfertasPage } from './l-ofertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LOfertasPageRoutingModule
  ],
  declarations: [LOfertasPage]
})
export class LOfertasPageModule {}
