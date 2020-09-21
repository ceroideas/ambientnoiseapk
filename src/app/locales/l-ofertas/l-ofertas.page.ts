import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-l-ofertas',
  templateUrl: './l-ofertas.page.html',
  styleUrls: ['./l-ofertas.page.scss'],
})
export class LOfertasPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

}
