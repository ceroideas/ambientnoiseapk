import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  @ViewChild('content') private content: any;

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  types = [
  "Menú",
  "Información",
  "Comentarios"
  ]

  type = "Menú";

  constructor(public nav: NavController, public events: EventsService) { }

  ngOnInit() {
    this.events.destroy('scrollBottom');
    this.events.subscribe('scrollBottom',()=>{
      console.log('bottom');
      this.content.scrollToBottom(800);
    })
  }

  ionViewDidEnter()
  {
    if (localStorage.getItem('openCart')) {
      localStorage.removeItem('openCart');
      let parentB = (document.getElementsByClassName('bottom-information')[0] as HTMLElement).style.bottom;
      if (parentB == '-480px') {
        this.changeBottom();
      }
    }
  }

  changeBottom()
  {
  	let parentB = (document.getElementsByClassName('bottom-information')[0] as HTMLElement).style.bottom;
  	let handlerI = document.getElementsByClassName('handler')[0].children[0].attributes['name'].nodeValue;

  	if (parentB == '-480px') {
  		(document.getElementsByClassName('bottom-information')[0] as HTMLElement).style.bottom = "0";
  		document.getElementsByClassName('handler')[0].children[0].attributes['name'].nodeValue = 'chevron-down';
  	}else{
  		(document.getElementsByClassName('bottom-information')[0] as HTMLElement).style.bottom = "-480px";
  		document.getElementsByClassName('handler')[0].children[0].attributes['name'].nodeValue = 'chevron-up';
  	}
  }

  back()
  {
    this.nav.back();
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
