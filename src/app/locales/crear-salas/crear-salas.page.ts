import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-salas',
  templateUrl: './crear-salas.page.html',
  styleUrls: ['./crear-salas.page.scss'],
  providers: [FileTransfer,Camera]
})
export class CrearSalasPage implements OnInit {

  local:any;
  rooms:any = [];

  constructor(public api: ApiService, public navparams: NavparamsService, public nav: NavController, public alertCtrl: AlertController, public events: EventsService,
  	public loading: LoadingController, private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public route: ActivatedRoute) {
  	this.api.getStablishment(this.route.snapshot.params.id).subscribe(data=>{
  		this.local = data;
  	});
    this.getRooms();
  }

  ngOnInit() {
    this.events.destroy('reloadRooms');
    this.events.subscribe('reloadRooms',()=>{
      this.getRooms();
    });
  }

  getRooms()
  {
    this.api.getRooms(this.route.snapshot.params.id).subscribe(data=>{
      this.rooms = data;
    })
  }

  loadImage()
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.api.fixMargin();
     this.uploadImage(imageData);

    }, (err) => {
     // Handle error
    });
  }

  deleteParams()
  {
    this.navparams.setParam(null);
  }

  uploadImage(uri)
  {
    this.toast.create({message: "Subiendo imagen, espere un momento", duration: 4000}).then(t=>{
      t.present();
    });

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
        fileKey: 'image',
        fileName: 'name.jpg',
        chunkedMode: false,
        mimeType: "image/form-data",
        httpMethod: 'POST',
        params: { id: this.local.id },
        headers: {}
    }

    fileTransfer.upload(uri, this.api.url+'/uploadImageRoom', options)
     .then((data) => {

  		this.local = JSON.parse(data['response'])[0];

     }, (err) => {
       // error
       console.log('error',err)
     })
  }

  editRoom(r)
  {
    this.navparams.setParam(r);
    this.nav.navigateForward("local/locales/nueva-sala/"+r.id);
  }

}
