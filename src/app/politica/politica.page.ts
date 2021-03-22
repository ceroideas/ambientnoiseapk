import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-politica',
  templateUrl: './politica.page.html',
  styleUrls: ['./politica.page.scss'],
})
export class PoliticaPage implements OnInit {

  page;

  constructor(public api: ApiService) { }

  ngOnInit() {
  	this.api.getPage().subscribe(data=>{
  		this.page = data;
  		console.log(data);
  	})
  }

}
