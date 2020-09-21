import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LEventosPageRoutingModule } from './l-eventos-routing.module';

import { LEventosPage } from './l-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LEventosPageRoutingModule
  ],
  declarations: [LEventosPage]
})
export class LEventosPageModule {}
