import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-tutorial',
  templateUrl: './home-tutorial.component.html',
  styleUrls: ['./home-tutorial.component.scss'],
})
export class HomeTutorialComponent implements OnInit {

  slideOpts = {
  	slidesPerView: 5.5
  }

  constructor() { }

  ngOnInit() {}

}
