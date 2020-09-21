import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoperoPageRoutingModule } from './ropero-routing.module';

import { RoperoPage } from './ropero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoperoPageRoutingModule
  ],
  declarations: [RoperoPage]
})
export class RoperoPageModule {}
