import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  constructor() { }

  ngOnInit() {
  }

}
