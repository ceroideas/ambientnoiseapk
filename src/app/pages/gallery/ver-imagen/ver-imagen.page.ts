import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ver-imagen',
  templateUrl: './ver-imagen.page.html',
  styleUrls: ['./ver-imagen.page.scss'],
})
export class VerImagenPage implements OnInit {

  @Input() im:any;

  constructor() { }

  ngOnInit() {
  }

}
