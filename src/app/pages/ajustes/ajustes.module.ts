import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesPageRoutingModule } from './ajustes-routing.module';

import { AjustesPage } from './ajustes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AjustesPageRoutingModule
  ],
  declarations: [AjustesPage]
})
export class AjustesPageModule {}
