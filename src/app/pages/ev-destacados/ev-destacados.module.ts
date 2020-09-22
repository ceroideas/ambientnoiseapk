import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvDestacadosPageRoutingModule } from './ev-destacados-routing.module';

import { EvDestacadosPage } from './ev-destacados.page';

import { ComponentModule } from '../../component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    EvDestacadosPageRoutingModule
  ],
  declarations: [EvDestacadosPage]
})
export class EvDestacadosPageModule {}
