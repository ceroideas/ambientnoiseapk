import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

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

    this.events.destroy('getAprobed');
    this.events.subscribe('getAprobed',(data)=>{
      this.api.aprobed(this.user.id).subscribe(data=>{
        this.aprobedUsers = data;
      })
    });
  }

  ngOnInit() {
    this.api.loadOtherUsers(this.user.id).subscribe((data:any)=>{
      this.users = data.new;
      this.aprobedUsers = data.aprobed;
    })

    this.api.getLikes(this.user.id).subscribe(data=>{
      this.likes = data;
    })
  }

  openDetalle()
  {
    this.navparams.setParam({us:this.users/*,likes:this.likes*/});
  	this.nav.navigateForward('tabs/home/sala-detalle');
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
    this.nav.navigateForward('tabs/home/galeria/'+us.id);
  }

}
