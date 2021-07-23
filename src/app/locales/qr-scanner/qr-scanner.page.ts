import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ApiService } from '../../services/api.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
  providers: [QRScanner]
})
export class QrScannerPage implements OnInit {

  user = JSON.parse(localStorage.getItem('ANuser'));
  scanSub:any;
  semitrans = false;
  scanner = false;

  timeout;

  constructor(private qrScanner: QRScanner, public nav: NavController, public alertCtrl: AlertController, public api: ApiService, private menu: MenuController, public loading: LoadingController) { }

  ngOnInit() {
  	this.prepareQrScanner();
  }

  ionViewDidEnter()
  {
  	// setTimeout(()=>{
  	// 	this.prepareQrScanner();
  	// },500)
  	(window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView2');
  	(window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  prepareQrScanner()
  {
  	setTimeout(()=>{
  		this.scanner = true;
  		this.semitrans = true;
  	},500)
  	this.timeout = setTimeout(()=>{
  		this.semitrans = false;
  	},5000);

  	this.qrScanner.prepare()
	  .then((status: QRScannerStatus) => {
	     if (status.authorized) {
	       // camera permission was granted
	       console.log('authorized')

	       // start scanning
	       this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
	         console.log('Scanned something', text);

	         (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
	         (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView2');

	         try{
	         	let t = JSON.parse(text);
	         	let params:any;

	         	if (!t.type) {
	         		throw "error";
	         	}

	         	if (t.type == 'order') {
	         		if (t.status == 1) {
	         			params = {message:"Desea marcar el pedido como servido?", buttons: [
						    {
						      text: "Si",
						      handler: ()=>{

						        this.loading.create().then(l=>{
						          l.present();

						          this.api.servir({id:t.id}).subscribe(data=>{
						            l.dismiss();
						          })
						        })
						      }
						    },{
						      text: "No"
						    }
						]}
	         		}
	         	}
	         	else if (t.type == 'closet') {
	         		if (t.status == 0) {
	         			params = {message:"Asigne la prenda a una percha",
						    inputs: [
							    {
							      type:'number',
							      placeholder: 'Nº de percha',
							      name: 'percha'
							    }
							    ],
							    buttons: [
							    {
							      text: "Aceptar",
							      handler: (a)=>{

							      	if (!a.percha) {
							      		return alert('Debe asignar una percha a las prendas');
							      	}

							        this.loading.create().then(l=>{
							          l.present();

							          this.api.asignar({id:t.id, percha: a.percha}).subscribe(data=>{
							            l.dismiss();
							          })
							        })
							      }
							    },{
							      text: "No"
							    }
						    ]};
	         		}else if (t.status == 1) {
	         			params = {message:"Desea marcar las prendas como entregadas?", buttons: [
						    {
						      text: "Si",
						      handler: ()=>{

						        this.loading.create().then(l=>{
						          l.present();

						          this.api.entregar({id:t.id}).subscribe(data=>{
						            l.dismiss();
						          })
						        })
						      }
						    },{
						      text: "No"
						    }
						]}
	         		}	         		
	         	}
	         	else if (t.type == 'reserve') {
	         		if (t.status == 1) {
	         			params = {message:"El usuario está en la sala?", buttons: [
						    {
						      text: "Si",
						      handler: ()=>{

						        this.loading.create().then(l=>{
						          l.present();

						          this.api.llegada({id:t.id}).subscribe(data=>{
						            l.dismiss();
						          })
						        })
						      }
						    },{
						      text: "No"
						    }
						]}
	         		}
	         	}

	         	if (params) {
	         		this.alertCtrl.create(params).then(a=>{a.present();})
	         	}else{
	         		alert("No se ha conseguido información válida del QR");
	         	}
	         	// alert(text);

		        this.scanSub.unsubscribe(); // stop scanning
	         	this.qrScanner.hide(); // hide camera preview
	           	this.qrScanner.destroy();

	         	return this.nav.pop();

	         }catch{
	         	this.alertCtrl.create({message:"El qr leido no es válido."})
	     		.then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});

		        this.scanSub.unsubscribe(); // stop scanning
	         	this.qrScanner.hide(); // hide camera preview
	           	this.qrScanner.destroy();

		        return this.nav.pop();
	         }

	       });

	       this.qrScanner.show();
	       console.log(this.scanSub);

	     } else if (status.denied) {
	     	this.alertCtrl.create({message:"Camera permission was permanently denied"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
	       // camera permission was permanently denied
	       // you must use QRScanner.openSettings() method to guide the user to the settings page
	       // then they can grant the permission from there
	     } else {
	     	this.alertCtrl.create({message:"Camera permission was denied"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
	       // permission was denied, but not permanently. You can ask for permission again at a later time.
	     }
	  })
	  .catch((e: any) => {console.log('Error is', e); this.alertCtrl.create({message:"QRScanner error "+JSON.stringify(e)}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});});
  }

  ionViewWillLeave()
  {
  	clearTimeout(this.timeout);
  	(window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  	(window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView2');
  	this.scanner = false;
  	this.semitrans = false;
	// if (this.scanSub) {
 // 		this.scanSub.unsubscribe(); // stop scanning
	// }
  	this.qrScanner.hide(); // hide camera preview
	this.qrScanner.destroy();
  }

}
