import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {

  establishments:any = [];

  constructor(public nav: NavController, public alertCtrl: AlertController, public api: ApiService, public events: EventsService, public loading: LoadingController, public cdr: ChangeDetectorRef) {
    if (localStorage.getItem('carrito')) {
      this.establishments = JSON.parse(localStorage.getItem('carrito'));
    }

    this.events.destroy('reloadCarrito');
    this.events.subscribe('reloadCarrito',()=>{
      this.establishments = JSON.parse(localStorage.getItem('carrito'));
    });
  }

  ngOnInit() {
  }

  subQ(i,j)
  {
  	this.establishments[i].products[j].quantity-=1;
    this.updateQ(i,j);
    if (this.establishments[i].products[j].quantity == 0) {
      this.alertCtrl.create({message:"Quiere eliminar el producto del carrito?",buttons: [
      {
        text: "Si",
        handler: ()=> {

          this.api.deleteProduct({id:this.establishments[i].products[j].id}).subscribe(data=>{
            console.log('producto eliminado');
          })

          this.establishments[i].products.splice(j,1);

          localStorage.setItem('carrito',JSON.stringify(this.establishments));

          this.events.publish('reloadCarta');

          setTimeout(()=>{
            let arr = document.getElementById('cart_items-'+i).getElementsByClassName('menu-item');
            let h = 75;
            for( let i in arr){
              if ((arr[i] as HTMLElement).offsetHeight != undefined) {
                h+=(arr[i] as HTMLElement).offsetHeight;
              }
            }
            console.log(h);
            (document.getElementById('cart_items-'+i) as HTMLElement).style.height = h+"px";
          },100)
        }
      },{
        text: "No",
        role: "cancel",
        handler: ()=> {
          this.establishments[i].products[j].quantity=1;
          this.updateQ(i,j);
        }
      }
      ]}).then(a=>a.present());
      return false;
    }
  }

  addQ(i,j)
  {
  	this.establishments[i].products[j].quantity+=1;

    this.updateQ(i,j);
  }
  updateQ(i,j){
    
    this.cdr.detectChanges();

    this.api.updateQuantity({id:this.establishments[i].products[j].id, quantity: this.establishments[i].products[j].quantity}).subscribe(data => {
      localStorage.setItem('carrito',JSON.stringify(data));
    })
  }

  collapse(e)
  {
    let h = (document.getElementById('cart_items-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('cart_items-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('cart_items-'+e).getElementsByClassName('menu-item');
      let h = 75+24;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('cart_items-'+e) as HTMLElement).style.height = h+"px";
    }

  }

  pagar(id)
  {
    this.alertCtrl.create({message:"Está por pagar el pedido numero #0000"+id+". \n ¿Desea continuar?", buttons: [
      {
        text:"Pagar",
        handler:()=>{
          this.loading.create().then(l=>{
            l.present();
            this.api.payOrder({id:id}).subscribe(data=>{

              localStorage.setItem('carrito',JSON.stringify(data));
              this.establishments = data;
              this.events.publish('reloadCarta');

              this.alertCtrl.create({message:"Gracias por su compra! Se ha generado un código QR que deberá mostrar cuando le entreguen su pedido."}).then(a=>a.present());

              l.dismiss();

            })
          })
        }
      },{
        text: "Cancelar"
      }
    ]}).then(a=>a.present());
  }

}
