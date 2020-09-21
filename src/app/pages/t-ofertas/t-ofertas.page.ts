import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-t-ofertas',
  templateUrl: './t-ofertas.page.html',
  styleUrls: ['./t-ofertas.page.scss'],
})
export class TOfertasPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

}
