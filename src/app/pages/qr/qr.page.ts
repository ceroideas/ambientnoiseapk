import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  @Input() data: any;
  @Input() reserva: any;

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  cerrar()
  {
  	this.modal.dismiss();
  }

}
