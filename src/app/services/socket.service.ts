import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { Observable, Subscription } from 'rxjs';
import { EventsService } from '../services/events.service';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  conn;
  peer;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(private socket: Socket, public events: EventsService, public router: Router) {
  	this.startConnection();
  }

  startConnection()
  {
  	this.socket.on('conectado',data=>{
      // console.log(data.msg);
    })

    this.socket.on('newMessage',data=>{

      console.log(data,data.to_id,this.user.id,data.to_id == this.user.id);
      
      this.user = JSON.parse(localStorage.getItem('ANuser'));

      if (data.to_id == this.user.id) {
        this.events.publish('addNewMessage',data);
        if (this.router.url.indexOf('chat-room/') === -1) {
          this.events.publish('addDot',data.from_id);
        }
      }
      if (data.from_id == this.user.id) {
        this.events.publish('addNewMessage1',data);
      }
    })
  }

  connetToPeer(id)
  {
  	
  }

  sendMessage(data)
  {
    console.log(data);
  	this.socket.emit('sendMessage',data);
  }

  retrieveConnection()
  {
  	
  }
}
