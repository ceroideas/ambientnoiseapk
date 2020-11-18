import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerImagenPageRoutingModule } from './ver-imagen-routing.module';

import { VerImagenPage } from './ver-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerImagenPageRoutingModule
  ],
  declarations: [VerImagenPage]
})
export class VerImagenPageModule {}
