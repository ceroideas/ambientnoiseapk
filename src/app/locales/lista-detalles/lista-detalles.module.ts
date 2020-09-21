import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDetallesPageRoutingModule } from './lista-detalles-routing.module';

import { ListaDetallesPage } from './lista-detalles.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListaDetallesPageRoutingModule
  ],
  declarations: [ListaDetallesPage]
})
export class ListaDetallesPageModule {}
