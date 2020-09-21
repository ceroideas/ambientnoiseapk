import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.page.html',
  styleUrls: ['./lista-detalles.page.scss'],
})
export class ListaDetallesPage implements OnInit {

  name = localStorage.getItem('listName');

  guests = [1];

  list = [
  {name:"Jorge Solano"},
  {name:"Illya Albarado"},
  {name:"Cesar Gutierrez"},
  {name:"Karla Arteta"},
  {name:"Ibai Llanos"}
  ];

  query;

  constructor(public nav: NavController, public cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  addGuest(i)
  {
  	let h = this.guests.findIndex(x=>x==i);

  	if (h == -1) {
  		this.guests.push(i);
  	}else{
  		this.guests.splice(h,1);
  	}
  	this.cdr.detectChanges();
  }

}
