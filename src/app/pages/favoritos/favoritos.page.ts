import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos;
  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  constructor() { }

  ngOnInit() {
  }

  viewFavoritos()
  {
  	this.favoritos = 1;
  }

}
