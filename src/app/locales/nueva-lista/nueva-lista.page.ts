import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-lista',
  templateUrl: './nueva-lista.page.html',
  styleUrls: ['./nueva-lista.page.scss'],
})
export class NuevaListaPage implements OnInit {

  todo:any = {};
  type;

  constructor(public nav: NavController, public alert: AlertController) { }

  ngOnInit() {
  }

  addGuests() {
  	if (!this.todo.name) {
  		this.alert.create({message:"Debe añadir nombre a la lista"}).then(a=>{a.present()});
  	}else{
  		localStorage.setItem('listName',this.todo.name);
  		this.nav.navigateForward('local/listas/lista-detalles');
  	}
  }

}
