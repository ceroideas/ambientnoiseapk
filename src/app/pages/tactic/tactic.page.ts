import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { VerPage } from '../detalles/ver/ver.page';

@Component({
  selector: 'app-tactic',
  templateUrl: './tactic.page.html',
  styleUrls: ['./tactic.page.scss'],
})
export class TacticPage implements OnInit, OnDestroy {

  local = JSON.parse(localStorage.getItem('actualLocal'));
  user = JSON.parse(localStorage.getItem('ANuser'));

  types = [
  "Menú",
  "Información",
  "Comentarios"
  ]

  type = "Menú";

  schedule:any;

  menus:any;

  carrito:any = [];

  comments:any = [];

  dias = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];

  canLeave = false;

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public alertCtrl: AlertController, public toast: ToastController, public modalController: ModalController) { }

  ngOnInit() {
    this.canLeave = false;
    this.api.getMenusAndH(this.local.id).subscribe(data=>{
      this.menus = data[0];
      this.schedule = data[1];
      this.comments = data[2];

      console.log(data);
    })

    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    }
  }

  ngOnDestroy() {
    // console.log('saliendo de la vista')
    this.api.addRecord({user_id:this.user.id,establishment_id:this.local.id,action:0}).subscribe(data=>{
      console.log(data);
    })
  }

  // ionViewCanLeave():boolean
  // {
  //   return false;
  //   // if (!this.canLeave) {

  //     this.alertCtrl.create({message:"Está por salir de la vista táctica del local",buttons:[{text:"Continuar",handler:()=>{

  //       this.exitPage();

  //     }},{text:"Cancelar", handler:()=>{

  //       return false;

  //     }}]}).then(a=>a.present());

  //     return false;

  //   // }
  // }

  // exitPage()
  // {
  //   this.canLeave = true;
  //   this.nav.pop();
  // }

  ionViewDidEnter()
  {
    if (localStorage.getItem('openCart')) {
      // localStorage.removeItem('openCart');
      let parentB = (document.getElementsByClassName('bottom-informationT')[0] as HTMLElement).style.height;
      if (parentB == '28px') {
        this.changeBottom();
      }
    }
  }

  changeBottom()
  {
    let parentB = (document.getElementsByClassName('bottom-informationT')[0] as HTMLElement).style.height;
    let handlerI = document.getElementsByClassName('handlerT')[0].children[0].attributes['name'].nodeValue;

    if (parentB == '28px') {
      (document.getElementsByClassName('bottom-informationT')[0] as HTMLElement).style.height = "450px";
      document.getElementsByClassName('handlerT')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
    }else{
      if (localStorage.getItem('openCart')) {
        this.nav.navigateForward('tabs/home/tactic');
        localStorage.removeItem('openCart');
      }
      (document.getElementsByClassName('bottom-informationT')[0] as HTMLElement).style.height = "28px";
      document.getElementsByClassName('handlerT')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
    }
  }

  back()
  {
    this.nav.pop();
  }

  collapse(e)
  {
    let h = (document.getElementById('items-t-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('items-t-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('items-t-'+e).getElementsByClassName('menu-item');
      let h = 0;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('items-t-'+e) as HTMLElement).style.height = h+"px";
    }

  }

  openCart() {
  	localStorage.setItem('openCart','1');
    // this.nav.navigateForward('/tabs/home/detalles/'+this.local.id);
  	this.nav.pop();
  }

  addToCart(pl)
  {

    let a = 0;
    let b = 0;
    let establishment = this.carrito.find(x=>x.establishment_id == this.local.id);

    console.log(establishment);

    if (establishment) {
      if (establishment.products.find(x=>x.plate_id == pl.id)) {
        a++;
      }

      if (establishment.offer) {
        if (establishment.offer.type == 2) {
         return this.alertCtrl.create({message: "El carrito posee una oferta de un único producto"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);})
        }
      }
    }

    if (a > 0) {
      this.alertCtrl.create({message: "Ya en el carrito", buttons: [
      {
        text:"Aceptar"
      },{
        text:"Ir al carrito",
        handler: ()=>{
          this.nav.navigateForward('tabs/perfil/carrito');
        }
      }
      ]}).then(a=>a.present())
    }else{
      this.alertCtrl.create({header: "Añadir al carrito", message: "Quieres añadir "+pl.title+" al carrito?", buttons: [
      {
        text: "Si",
        handler: ()=>{

          if (establishment) {
            this.carrito.splice(this.carrito.findIndex(x=>x.establishment_id == this.local.id),1);
          }else{
            establishment = {establishment_id: this.local.id, products: []}
          }

          establishment.products.push({plate_id:pl.id, price: pl.price, quantity: 1});
          this.carrito.push(establishment);

          localStorage.setItem('carrito', JSON.stringify(this.carrito));

          this.api.saveOrder({order: this.carrito, user_id: this.user.id}).subscribe(data=>{
            console.log(data);
            localStorage.setItem('carrito',JSON.stringify(data));
            this.events.publish('reloadCarrito');
          })

          this.alertCtrl.create({message:pl.title+" añadido al carrito!", buttons: [
          {
            text:"Aceptar"
          },{
            text:"Ir al carrito",
            handler: ()=>{
              this.nav.navigateForward('tabs/perfil/carrito');
            }
          }
          ]}).then(a=>a.present());

          this.toast.create({message: pl.title+" añadido al carrito!", duration: 3000}).then(t=>t.present());
        }
      },{
        text: "Cancelar"
      }
      ]}).then(a=>a.present());
    }
  }

  async openDetails(pl)
  {
    const modal = await this.modalController.create({
      component: VerPage,
      cssClass: 'ver-plato',
      componentProps: {
      'plato': pl,
    }
    });
    return await modal.present();
  }

  openComment()
  {
    this.nav.navigateForward('/tabs/home/comment/'+this.local.id)
  }

}
