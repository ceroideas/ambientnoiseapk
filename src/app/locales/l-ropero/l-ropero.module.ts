import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LRoperoPageRoutingModule } from './l-ropero-routing.module';

import { LRoperoPage } from './l-ropero.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LRoperoPageRoutingModule
  ],
  declarations: [LRoperoPage]
})
export class LRoperoPageModule {}
