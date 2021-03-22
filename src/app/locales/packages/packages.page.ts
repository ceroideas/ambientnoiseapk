import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {

  packages:any = [];
  user = JSON.parse(localStorage.getItem('ANuser'));
  errorMessage;
  constructor(public api: ApiService, public nav: NavController, public navparams: NavparamsService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  	this.api.getPackages().subscribe(data=>{
  		this.packages = data;
  	})
  }

  ngOnInit() {
  }

  payPackage(p)
  {
    this.loadingCtrl.create().then(l=>{
      l.present()
      this.api.checkPackage({id:p.id,user_id:this.user.id}).subscribe(data=>{
        l.dismiss()
        this.navparams.setParam(p);
        this.nav.navigateForward('local/packages/pay');

      },err=>{
        l.dismiss();
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
      })
    })
  }

}
