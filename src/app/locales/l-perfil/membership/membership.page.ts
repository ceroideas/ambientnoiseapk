import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));
  packages:any;
  constructor(public api: ApiService, public nav: NavController) {
  	this.api.getMyMembership(this.user.id).subscribe(data=>{
  		this.packages = data;
  	})
  }

  ngOnInit() {
  }

}
