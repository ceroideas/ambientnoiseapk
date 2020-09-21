import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcupacionPageRoutingModule } from './ocupacion-routing.module';

import { OcupacionPage } from './ocupacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcupacionPageRoutingModule
  ],
  declarations: [OcupacionPage]
})
export class OcupacionPageModule {}
