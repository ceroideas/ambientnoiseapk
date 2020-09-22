import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  constructor() { }

  ngOnInit() {
  }

}
