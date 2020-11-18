import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaListaPageRoutingModule } from './nueva-lista-routing.module';

import { NuevaListaPage } from './nueva-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NuevaListaPageRoutingModule
  ],
  declarations: [NuevaListaPage]
})
export class NuevaListaPageModule {}
