import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CestaPageRoutingModule } from './cesta-routing.module';

import { CestaPage } from './cesta.page';

import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CestaPageRoutingModule
  ],
  declarations: [CestaPage]
})
export class CestaPageModule {}
