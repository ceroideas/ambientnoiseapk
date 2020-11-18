import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';

import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PedidosPageRoutingModule
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
