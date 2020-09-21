import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CestaPageRoutingModule } from './cesta-routing.module';

import { CestaPage } from './cesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CestaPageRoutingModule
  ],
  declarations: [CestaPage]
})
export class CestaPageModule {}
