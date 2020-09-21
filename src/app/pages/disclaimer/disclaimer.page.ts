import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  options = [false,false,false,false];

  constructor() { }

  ngOnInit() {
  }

  acceptAll()
  {
  	this.options = [true,true,true,true];
  }

}
