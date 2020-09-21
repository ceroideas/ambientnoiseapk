import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-l-eventos',
  templateUrl: './l-eventos.page.html',
  styleUrls: ['./l-eventos.page.scss'],
})
export class LEventosPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  openInformation(id)
  {
  	// if ((document.getElementById('bi-'+id) as HTMLElement).offsetHeight > 0) {
  	// 	return (document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";
  	// }
  	// (document.getElementById('bi-'+id) as HTMLElement).style.height = 'fit-content';
  	// let h = (document.getElementById('bi-'+id) as HTMLElement).offsetHeight;

  	// (document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";

  	// setTimeout(()=>{
  	// 	(document.getElementById('bi-'+id) as HTMLElement).style.height = h+"px";
  	// },10)

  }

}
