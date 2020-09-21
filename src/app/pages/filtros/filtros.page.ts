import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.page.html',
  styleUrls: ['./filtros.page.scss'],
})
export class FiltrosPage implements OnInit {

  ambientes = [
	"Todos",
	"Discoteca",
	"Cócteles",
	"Irlandés",
	"Karaoke",
	"Cafés",
	"Teterías"
  ];

  tmusica = [
	"Todos",
	"Bachata",
	"Cumbia",
	"Salsa"
  ];

  locupacion = [
	"40%",
	"60%",
	"80%",
	"+100%"
  ];

  ambiente;
  musica;
  ocupacion;

  range = {lower:20,upper:80};

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  back()
  {
  	this.nav.back();
  }

  clear()
  {
	this.ambiente = null;
	this.musica = null;
	this.ocupacion = null;
	this.range = {lower:20,upper:80};
  }

}
