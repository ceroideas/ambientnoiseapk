import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-ropero',
  templateUrl: './ropero.page.html',
  styleUrls: ['./ropero.page.scss'],
})
export class RoperoPage implements OnInit {

  quantity = 0;
  closet = null;
  
  local = JSON.parse(localStorage.getItem('actualLocal'));
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public api: ApiService, public alertCtrl: AlertController, public loading: LoadingController, public events: EventsService) { }

  ngOnInit() {

    this.events.destroy('reloadCloset');
    this.events.subscribe('reloadCloset',(data)=>{
      this.closet = data;
    });
    this.api.getCloset({id:this.local.id,user_id:this.user.id}).subscribe((data:any)=>{
      console.log(data);
      if (data) {
        this.closet = data;
        this.quantity = data.quantity;
      }
    })
  }

  subQ()
  {
  	if (this.quantity > 0) {
  		this.quantity--;
  	}
  }

  addQ()
  {
  	this.quantity++;
  }

  pagar()
  {
    this.alertCtrl.create({message:"Está por pagar el servicio de ropero. \n ¿Desea continuar?", buttons: [
      {
        text:"Pagar",
        handler:()=>{

          this.nav.navigateForward('tabs/home/ropero/pagar-r/'+this.local.id+'/'+this.quantity);

          // this.loading.create().then(l=>{
          //   l.present();
          //   this.api.payCloset({user_id:this.user.id, local_id:this.local.id,quantity:this.quantity}).subscribe(data=>{

          //     this.closet = data;

          //     this.alertCtrl.create({message:"Gracias por su compra! Se ha generado un código QR que deberá mostrar cuando entregue sus prendas."}).then(a=>a.present());

          //     l.dismiss();

          //   })
          // })
        }
      },{
        text: "Cancelar"
      }
    ]}).then(a=>a.present());
  }

}
