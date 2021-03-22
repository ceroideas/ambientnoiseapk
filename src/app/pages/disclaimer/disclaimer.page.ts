import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.page.html',
  styleUrls: ['./disclaimer.page.scss'],
})
export class DisclaimerPage implements OnInit {

  options = [];
  disclaimers = [];

  disabled = true;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getDisclaimers().subscribe((data:any)=>{
      for (var i = 0; i < data.length; i++) {
        this.options.push(false);
      }
      this.disclaimers = data;
    })
  }

  acceptAll()
  {
  	for (var i = 0; i < this.options.length; i++) {
      this.options[i] = true;
    }

    this.disabled = false;
  }

  accept()
  {
    let a = 0;

    setTimeout(()=>{
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i] == true) {
          a++;
        }
      }

      if (a == this.options.length) {
        this.disabled = false;
      }else{
        this.disabled = true;
      }
    },100)
  }

}
