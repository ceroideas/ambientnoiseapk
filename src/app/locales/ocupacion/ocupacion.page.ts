import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.page.html',
  styleUrls: ['./ocupacion.page.scss'],
})
export class OcupacionPage implements OnInit {

  ocupacion = 0;

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

}
