import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {

  todo:any = {};
  step = 1;

  constructor(public nav: NavController, public alert: AlertController) { }

  ngOnInit() {
  }

  nextStep()
  {
    if (this.step == 4) {
      this.nav.back();
      this.alert.create({message:"Local creado (prueba)"}).then(a=>{
        a.present();
      })
    }else{
  	  this.step++;
    }
  }

}
