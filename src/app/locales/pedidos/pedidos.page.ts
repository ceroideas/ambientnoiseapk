import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-pedidos-local',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  selected = 0;
  pedidos:any = []
  locals;
  local_id;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public loading: LoadingController, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.api.getMyStablishments(this.user.id,1).subscribe((data:any)=>{
      this.locals = data.data;
    })
  }

  retrieveOrders()
  {
    this.loading.create().then(l=>{
      l.present();
      this.api.retrieveOrders({id:this.local_id}).subscribe((data)=>{
        this.pedidos = data;
        l.dismiss();
      })
    })
  }

  collapse(e)
  {
    let h = (document.getElementById('items-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('items-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('items-'+e).getElementsByClassName('menu-item');
      let h = 0;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('items-'+e) as HTMLElement).style.height = h+"px";
    }

  }

  servir(id)
  {
    this.alertCtrl.create({message:"Desea marcar el pedido como servido?", buttons: [
    {
      text: "Si",
      handler: ()=>{

        this.loading.create().then(l=>{
          l.present();

          this.api.servir({id:id}).subscribe(data=>{
            l.dismiss();

            this.pedidos = data;
          })
        })
      }
    },{
      text: "No"
    }
    ]}).then(a=>a.present());
  }

}
