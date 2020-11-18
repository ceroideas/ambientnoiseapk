import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.page.html',
  styleUrls: ['./filtros.page.scss'],
})
export class FiltrosPage implements OnInit {

  ambientes = [
	// "Todos",
	// "Discoteca",
	// "Cócteles",
	// "Irlandés",
	// "Karaoke",
	// "Cafés",
	// "Teterías"
  ];

  tmusica = [
	// "Todos",
	// "Bachata",
	// "Cumbia",
	// "Salsa"
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

  constructor(public nav: NavController, public navparams: NavparamsService, public events: EventsService) { }

  ngOnInit() {
    let data = this.navparams.getParam();

    this.ambientes = data.ambientes;
    this.tmusica = data.tmusica;

    this.ambiente = data.ambiente;
    this.musica = data.musica;
    this.ocupacion = data.ocupacion;
    this.range = data.range;

    console.log(data);
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

  this.filtrar();
  }

  filtrar()
  {
    let data = {ambientes:this.ambientes,tmusica:this.tmusica,ocupacion:this.ocupacion,range:this.range, ambiente: this.ambiente, musica:this.musica};
    this.navparams.setParam(data);

    this.back();

    this.events.publish('filterEstablishments');
    this.events.publish('filterMapEstablishments');
  }

}
