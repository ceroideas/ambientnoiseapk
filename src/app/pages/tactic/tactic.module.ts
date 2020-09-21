import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TacticPageRoutingModule } from './tactic-routing.module';

import { TacticPage } from './tactic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TacticPageRoutingModule
  ],
  declarations: [TacticPage]
})
export class TacticPageModule {}
