import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { Observable, Subscription } from 'rxjs';
import { EventsService } from '../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  conn;
  peer;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(private socket: Socket, public events: EventsService) {
  	this.startConnection();
  }

  startConnection()
  {
  	this.socket.on('conectado',data=>{
      console.log(data.msg);
    })

    this.socket.on('newMessage',data=>{
      if (data.to_id == this.user.id || data.from_id == this.user.id) {
        this.events.publish('addNewMessage',data);
      }
    })
  }

  connetToPeer(id)
  {
  	
  }

  sendMessage(data)
  {
  	this.socket.emit('sendMessage',data);
  }

  retrieveConnection()
  {
  	
  }
}
