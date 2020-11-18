import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  local = JSON.parse(localStorage.getItem('actualLocal'))
  user = JSON.parse(localStorage.getItem('ANuser'))
  users:any = [];
  aprobedUsers:any;
  likes:any;

  constructor(public nav: NavController, public api: ApiService, public navparams: NavparamsService, public events: EventsService) {
    // this.events.destroy('getLikes');
    // this.events.subscribe('getLikes',(data)=>{
    //   this.likes = data
    // });

    this.events.destroy('getAprobedAll');
    this.events.subscribe('getAprobedAll',(data)=>{
      this.getAprobedUsers();
    });
  }

  ngOnInit() {
    this.getAprobedUsers()

    // this.api.getLikes(this.user.id).subscribe(data=>{
    //   this.likes = data;
    // })
  }

  getAprobedUsers()
  {
  	this.api.aprobed(this.user.id).subscribe(data=>{
    	this.aprobedUsers = data;
  	})
  }

  openChat(u)
  {
    localStorage.setItem('actualChat',u.id);
    this.nav.navigateForward('tabs/chat-room/'+u.id);
    this.events.publish('reloadChat');
  }

  verGaleria(us)
  {
    this.navparams.setParam(us);
    this.nav.navigateForward('tabs/chat-room/galeria/'+us.id);
  }

}
