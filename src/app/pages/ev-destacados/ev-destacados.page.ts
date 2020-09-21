import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ev-destacados',
  templateUrl: './ev-destacados.page.html',
  styleUrls: ['./ev-destacados.page.scss'],
})
export class EvDestacadosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openInformation(id)
  {
  	if ((document.getElementById('bi-'+id) as HTMLElement).offsetHeight > 0) {
  		return (document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";
  	}
  	(document.getElementById('bi-'+id) as HTMLElement).style.height = 'fit-content';
  	let h = (document.getElementById('bi-'+id) as HTMLElement).offsetHeight;

  	(document.getElementById('bi-'+id) as HTMLElement).style.height = "0px";

  	setTimeout(()=>{
  		(document.getElementById('bi-'+id) as HTMLElement).style.height = h+"px";
  	},10)

  }

}
