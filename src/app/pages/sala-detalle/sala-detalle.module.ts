import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaDetallePageRoutingModule } from './sala-detalle-routing.module';

import { SalaDetallePage } from './sala-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaDetallePageRoutingModule
  ],
  declarations: [SalaDetallePage]
})
export class SalaDetallePageModule {}
