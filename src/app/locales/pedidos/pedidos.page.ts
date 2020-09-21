import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

    collapse(e)
  {
    let h = (document.getElementById('items-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('items-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('items-'+e).getElementsByClassName('menu-item');
      let h = 0;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('items-'+e) as HTMLElement).style.height = h+"px";
    }

  }

}
