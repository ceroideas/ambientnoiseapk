import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LPerfilPageRoutingModule } from './l-perfil-routing.module';

import { LPerfilPage } from './l-perfil.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LPerfilPageRoutingModule
  ],
  declarations: [LPerfilPage]
})
export class LPerfilPageModule {}
