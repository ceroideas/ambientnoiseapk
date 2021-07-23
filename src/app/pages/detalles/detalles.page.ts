import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';
import { ApiService } from '../../services/api.service';
import { VerPage } from './ver/ver.page';
import { CommentPage } from '../comment/comment.page';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  @ViewChild('content') private content: any;

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  types = [
  "Menú",
  "Información",
  "Comentarios"
  ]

  type = "Menú";

  local:any;

  schedule:any;

  menus:any;

  dias = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];

  favorite = false;

  carrito:any = [];

  isTactic = false;

  comments:any = [];

  fake = localStorage.getItem('fakeUser');

  lat = localStorage.getItem('lat');
  lon = localStorage.getItem('lon');

  constructor(
    public cdr: ChangeDetectorRef,
    public nav: NavController, public events: EventsService, private route: ActivatedRoute, public api: ApiService, public alertCtrl: AlertController,
    public toast: ToastController, public modalController: ModalController, public navparams: NavparamsService, public loading: LoadingController) {

    this.events.destroy('realOcupation');
    this.events.subscribe('realOcupation',()=>{
      this.api.realOcupation(this.local.id).subscribe((data:any)=>{
        this.local.real_ocupation = data.toFixed(2);
        this.events.publish('updateLocal',this.local);
      })
    });

    this.events.destroy('updateDistance');
    this.events.subscribe('updateDistance',(l)=>{
      this.local.distance = l;
      this.events.publish('updateLocal',this.local);
    });

    if (localStorage.getItem('carrito')) {
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    }

    if (this.route.snapshot.params.id) {
      this.local = JSON.parse(localStorage.getItem('actualLocal'));

      this.isTactic = localStorage.getItem('closer') == this.local.id

      this.api.getMenusAndH(this.local.id).subscribe(data=>{
        this.menus = data[0];
        this.schedule = data[1];
        this.comments = data[2];

        console.log(data);
      })

      this.api.getFavorite(this.user.id,this.local.id).subscribe(data=>{
        console.log(data);
        this.favorite = data != null;
      })

      this.events.destroy('activateTactic');
      this.events.subscribe('activateTactic',(id)=>{
        this.isTactic = (id == this.local.id);
      });

      this.events.destroy('desactivateTactic');
      this.events.subscribe('desactivateTactic',()=>{
        this.isTactic = false;
      });
      //
      this.api.getOcupation(this.local.id).subscribe((data:any)=>{
        this.local.real_ocupation = data.toFixed(2);
        this.events.publish('updateLocal',this.local);
      });

      this.reloadDistance(false);

      this.events.publish('getCloser');
    }
  }

  ngOnInit() {
    this.events.destroy('scrollBottom');
    this.events.subscribe('scrollBottom',()=>{
      console.log('bottom');
      this.content.scrollToBottom(800);
    })

    this.events.destroy('addToCart');
    this.events.subscribe('addToCart',(pl)=>{
      this.addToCart(pl);
    });

    this.events.destroy('reloadCarta');
    this.events.subscribe('reloadCarta',(pl)=>{
      this.carrito = JSON.parse(localStorage.getItem('carrito'));
    });

  }

  ionViewDidEnter()
  {
    if (localStorage.getItem('openCart')) {
      // localStorage.removeItem('openCart');
      let parentB = (document.getElementsByClassName('bottom-informationD')[0] as HTMLElement).style.height;
      if (parentB == '28px') {
        this.changeBottom();
      }
    }
  }

  changeBottom()
  {
  	let parentB = (document.getElementsByClassName('bottom-informationD')[0] as HTMLElement).style.height;
  	let handlerI = document.getElementsByClassName('handlerD')[0].children[0].attributes['name'].nodeValue;

  	if (parentB == '28px') {
  		(document.getElementsByClassName('bottom-informationD')[0] as HTMLElement).style.height = "450px";
  		document.getElementsByClassName('handlerD')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}else{
      if (localStorage.getItem('openCart')) {
        this.nav.navigateForward('tabs/home/tactic');
        localStorage.removeItem('openCart');
      }
  		(document.getElementsByClassName('bottom-informationD')[0] as HTMLElement).style.height = "28px";
  		document.getElementsByClassName('handlerD')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
  	}
  }

  back()
  {
    this.nav.pop();
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

  addFavorite()
  {
    if (this.fake) {return this.fakeAlert();}
    this.api.addRemoveFavorite({establishment_id:this.local.id, user_id: this.user.id}).subscribe((data:any)=>{
      if (data.action == 'deleted') {
        this.favorite = false;
      }else if (data.action == 'added') {
        this.favorite = true;
      }

      this.events.publish('reloadFavorites');
    })
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
        text:"Seguir Comprando"
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
            text:"Seguir Comprando"
          },{
            text:"Ir al carrito",
            handler: ()=>{
              this.nav.navigateForward('tabs/perfil/carrito');
            }
          }
          ]}).then(a=>a.present());

          // this.toast.create({message: , duration: 3000}).then(t=>t.present());
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
    if (this.fake) {return this.fakeAlert();}
    this.nav.navigateForward('/tabs/home/comment/'+this.local.id)
  }

  verReservas()
  {
    if (this.fake) {return this.fakeAlert();}
    this.navparams.setParam(this.local);
    this.nav.navigateForward('tabs/home/reservar/'+this.local.id);
  }

  misReservas()
  {
    if (this.fake) {return this.fakeAlert();}
    this.navparams.setParam(this.local);
    this.nav.navigateForward('tabs/home/mis-reservas/'+this.local.id);
  }

  verListas()
  {
    if (this.fake) {return this.fakeAlert();}
    this.navparams.setParam(this.local);
    this.nav.navigateForward('tabs/home/lista/'+this.local.id);
  }

  verGaleria()
  {
    this.navparams.setParam({type:'local',id:this.local.id,user:this.user,self:false});
    this.nav.navigateForward('tabs/home/galeria-local');
  }

  /**/

  canTactic()
  {
    if (this.fake) {return this.fakeAlert();}
    if (this.isTactic) {
      this.api.addRecord({user_id:this.user.id,establishment_id:this.local.id,action:1}).subscribe(data=>{
        console.log(data);
      })
      this.nav.navigateForward('/tabs/home/tactic');
    }
  }

  fakeAlert() {
    this.alertCtrl.create({message:"Función solo válida para usuarios registrados!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},2000);});
  }

  reloadDistance(l:any = false)
  {
    if (l) {
      this.loading.create().then((l)=>{
        l.present();
        this.reloadDistance2(l);
      })
    }else{
      this.reloadDistance2();
    }
  }

  reloadDistance2(l:any = false)
  {
    this.api.reloadDistance({id:this.local.id,lt:this.lat,ln:this.lon}).subscribe((data:any)=>{
      console.log(data);
      this.local.distance = data.distance;
      if ((data.distance*1000) < 100) {
        localStorage.setItem('closer',this.local.id);
        this.isTactic = true;
      }else{
        this.isTactic = false;
        localStorage.removeItem('closer');
      }
      if (l) {
        l.dismiss();
      }
      this.cdr.detectChanges();
    })
  }
}
