import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
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

  toTactic = false;

  constructor(public nav: NavController, public api: ApiService, public navparams: NavparamsService, public events: EventsService, public alert: AlertController, public loading: LoadingController) {
    // this.events.destroy('getLikes');
    // this.events.subscribe('getLikes',(data)=>{
    //   this.likes = data
    // });

    this.events.destroy('getAprobedAll');
    this.events.subscribe('getAprobedAll',(data)=>{
      this.getAprobedUsers();
    });

    this.events.destroy('addDot');
    this.events.subscribe('addDot',(id)=>{
      let u = this.aprobedUsers.find(x=>x.id == id);
      if (u) {
        u.not_seen = 1;
      }
    });

    this.events.destroy('removeDot');
    this.events.subscribe('removeDot',(id)=>{
      let u = this.aprobedUsers.find(x=>x.id == id);
      if (u) {
        u.not_seen = null;
      }
    });
  }

  ionViewDidEnter()
  {
    if (this.navparams.getParam() == 'back_to_tactic') {
      this.toTactic = true;
      this.navparams.setParam(null);
    }else{
      this.toTactic = false;
    }
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
    u.not_seen = 0;
    localStorage.setItem('actualChat',u.id);
    this.nav.navigateForward('tabs/chat-room/'+u.id);
    this.events.publish('reloadChat');
  }

  verGaleria(us)
  {
    this.navparams.setParam(us);
    this.nav.navigateForward('tabs/chat-room/galeria/'+us.id);
  }

  async block(i,id,name)
  {
    let msg = "";
    if (i == 1) {
      msg = "Desea bloquear al usuario "+name+"?";
    }
    else if (i == 2) {
      msg = "Desea denunciar al usuario "+name+"?";
    }

    const alert1 = await this.alert.create({message:"Usuario "+name+" bloqueado, no aparecerá más en tu sala"});
    const alert2 = await this.alert.create({message:"Escriba la razón por la que quiere denunciar al usuario "+name+", no aparecerá más en tu sala",
      inputs:[{
        type:"textarea",
        name:"description",
        placeholder:"Descripción de la denuncia"
      }],
      buttons:[{
        text:"Enviar",
        handler:(a)=>{
          if (!a.description) {
            return false;
          }

          this.api.report({user_id:this.user.id,blocked_id:id,description:a.description}).subscribe(data=>{
            this.getAprobedUsers();
            this.alert.create({message:"El usuario "+name+" ha sido denunciado, no aparecerá más en tu sala"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
          });
        }
      },{
        text:"Cancelar"
      }]});

    this.alert.create({message:msg,buttons:[{
      text:"Si",
      handler: ()=> {
        if (i == 1) {
          
          this.api.block({user_id:this.user.id,blocked_id:id}).subscribe(data=>{
            this.getAprobedUsers();
            alert1.present();
            setTimeout(()=>{alert1.dismiss()},3000);
          })

        }else if (i == 2) {
          alert2.present();
          setTimeout(()=>{alert2.dismiss()},3000);

        }
      }
    },{
      text:"Cancelar"
    }]}).then(a=>{

      a.present();

    })
  }

  deleteMatch(id,name)
  {
    this.alert.create({message:"¿Quiere deshacer el match con el usuario "+name+"?",buttons:
      [
      {
        text:"Si",
        handler: ()=>{
          this.loading.create().then(l=>{
            l.present();

            this.api.deleteMatch({user_id:this.user.id,id:id}).subscribe(data=>{
              l.dismiss();
              this.alert.create({message:"Se ha eliminado el match con el usuario "+name}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
              this.getAprobedUsers();
            })
          })
        }
      },{
        text:"No"
      }]
    }).then(a=>{
      a.present();
    })
  }
  deleteChat(id,name)
  {
    this.alert.create({message:"¿Quiere vaciar el chat con el usuario "+name+"?",buttons:
      [
      {
        text:"Si",
        handler: ()=>{
          this.loading.create().then(l=>{
            l.present();

            this.api.deleteChat({user_id:this.user.id,id:id}).subscribe(data=>{
              l.dismiss();
              this.alert.create({message:"Se ha vaciado el chat con el usuario "+name}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
              this.getAprobedUsers();
            })
          })
        }
      },{
        text:"No"
      }]
    }).then(a=>{
      a.present();
    })
  }

}
