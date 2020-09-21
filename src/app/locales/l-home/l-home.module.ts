import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LHomePageRoutingModule } from './l-home-routing.module';

import { LHomePage } from './l-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LHomePageRoutingModule
  ],
  declarations: [LHomePage]
})
export class LHomePageModule {}
