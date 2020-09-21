import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-oferta',
  templateUrl: './nueva-oferta.page.html',
  styleUrls: ['./nueva-oferta.page.scss'],
})
export class NuevaOfertaPage implements OnInit {

  todo:any = {};
  type;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

}
