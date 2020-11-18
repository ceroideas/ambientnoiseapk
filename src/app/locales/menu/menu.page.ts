import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, ToastController, ModalController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

import { NuevoPlatoPage } from '../nuevo-plato/nuevo-plato.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  providers: [FileTransfer,Camera]
})
export class MenuPage implements OnInit {

  constructor(public api: ApiService, public events: EventsService, public alert: AlertController, public nav: NavController, public loading: LoadingController,
  	private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public modalCtrl: ModalController) { }

  local = JSON.parse(localStorage.getItem('actualRestaurant'));
  menus:any;

  ngOnInit() {
  	this.loadMenus();

    this.events.destroy('loadMenus');
    this.events.subscribe('loadMenus',()=>{
      this.loadMenus();
    });
  }

  loadMenus()
  {
  	this.api.getMenus(this.local.id).subscribe(data=>{
  		this.menus = data;
  		console.log(data);
  	})
  }

  newMenu()
  {
  	this.alert.create({message: "Título del menú", inputs: [
  	{
      name: 'title',
      type: 'text',
      placeholder: '...'
    },
  	], buttons: [
  	{
  		text:"Guardar",
  		handler: (v)=>{
  			console.log(v);
  			if (!v.title) {
  				return false;
  			}

  			this.loading.create().then(l=>{
  				l.present();
	  			this.api.addMenu({establishment_id:this.local.id,title:v.title}).subscribe(data=>{
	  				l.dismiss();

	  				this.loadMenus();
	  			})
  			})
  		}
  	},{
  		text:"Cancelar"
  	}
  	]}).then(a=>{
  		a.present();
  	})
  }

  newPlate(id) {
    this.nav.navigateForward('local/perfil/nuevo-plato/'+id)
  // this.modalCtrl.create({
  //   component: NuevoPlatoPage,
  //   cssClass: 'create-plate',
  //   componentProps: {
  //     'menu_id': id,
  //   }
  // }).then(modal => modal.present());
}

  // newPlate(id)
  // {
  // 	this.alert.create({message:"Nuevo plato", inputs: [
  // 		{
  // 		  label: "Titulo",
	 //      name: 'title',
	 //      type: 'text',
	 //      placeholder: 'Titulo'
	 //    },{
  // 		  label: "Descripción",
  //         name: 'description',
  //         type: 'textarea',
  //         placeholder: 'Descripción'
  //       },
  //       {
  // 		  label: "Precio",
  //         name: 'price',
  //         type: 'number',
  //         placeholder: 'Precio €'
  //       }
  // 	], buttons: [
  // 	{
  // 		text: "Guardar",
  // 		handler: (v)=>{
  // 			console.log(v);
  // 			if (!v.title) {
  // 				return false;
  // 			}

  // 			this.loading.create().then(l=>{
  // 				l.present();
	 //  			this.api.addMenuPlate({menu_id:id,title:v.title,description:v.description,price:v.price}).subscribe(data=>{
	 //  				l.dismiss();

	 //  				this.loadMenus();
	 //  			})
  // 			})
  // 		}
  // 	},{
  // 		text:"Cancelar"
  // 	}
  // 	]}).then(a=>{
  // 		a.present();
  // 	})
  // }

  deleteMenu(id)
  {
  	this.alert.create({message:"Borrar el menú?",buttons: [
  	{
  		text:"Si",
  		handler: ()=>{
  			this.api.deleteMenu(id).subscribe(data=>{
  				this.loadMenus();
  			})
  		}
  	},{
  		text:"Cancelar"
  	}
  	]}).then(a=>{
  		a.present();
  	})
  }

  deletePlate(id)
  {
  	this.alert.create({message:"Borrar plato del menú?",buttons: [
  	{
  		text:"Si",
  		handler: ()=>{
  			this.api.deletePlate(id).subscribe(data=>{
  				this.loadMenus();
  			})
  		}
  	},{
  		text:"Cancelar"
  	}
  	]}).then(a=>{
  		a.present();
  	})
  }

}
