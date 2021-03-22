import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedsPageRoutingModule } from './blockeds-routing.module';

import { BlockedsPage } from './blockeds.page';

import { IonicContextMenuModule } from 'ionic-context-menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicContextMenuModule,
    IonicModule,
    BlockedsPageRoutingModule
  ],
  declarations: [BlockedsPage]
})
export class BlockedsPageModule {}
