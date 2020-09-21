import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LPerfilPageRoutingModule } from './l-perfil-routing.module';

import { LPerfilPage } from './l-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LPerfilPageRoutingModule
  ],
  declarations: [LPerfilPage]
})
export class LPerfilPageModule {}
