import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LEventosPageRoutingModule } from './l-eventos-routing.module';

import { LEventosPage } from './l-eventos.page';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LEventosPageRoutingModule
  ],
  declarations: [LEventosPage]
})
export class LEventosPageModule {}
