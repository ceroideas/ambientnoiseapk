import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { QrPage } from '../qr/qr.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos:any = [];
  roperos:any = [];

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public modal: ModalController, public api: ApiService) { }

  ngOnInit() {
    this.api.getOrders({user_id:this.user.id}).subscribe(data=>{
      this.pedidos = data[0];
      this.roperos = data[1];
    })
  }

  collapse(e)
  {
    let h = (document.getElementById('items-orders-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('items-orders-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('items-orders-'+e).getElementsByClassName('menu-item-order');
      let h = 0;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('items-orders-'+e) as HTMLElement).style.height = h+"px";
    }

  }

  async openModal(data)
  {
    const modal = await this.modal.create({
      component: QrPage,
      cssClass: "qrPage",
      componentProps: {
        'data': data
      }
    });
    return await modal.present();
  }

}
