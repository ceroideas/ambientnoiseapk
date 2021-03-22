import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatRoomPageRoutingModule } from './chat-room-routing.module';

import { ChatRoomPage } from './chat-room.page';

import { IonicContextMenuModule } from 'ionic-context-menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicContextMenuModule,
    IonicModule,
    ChatRoomPageRoutingModule
  ],
  declarations: [ChatRoomPage]
})
export class ChatRoomPageModule {}
