import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {

  lorem;
  title;

  faqs;

  query:any;

  constructor(public nav: NavController, public api: ApiService) { }

  ngOnInit() {
  	this.api.getFaqs().subscribe(data=>{
  		this.faqs = data;

  		console.log(data);
  	})
  }

}
