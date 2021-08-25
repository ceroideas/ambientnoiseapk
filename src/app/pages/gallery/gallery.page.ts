import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, AlertController, NavController, ToastController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

import { VerImagenPage } from './ver-imagen/ver-imagen.page';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  providers: [FileTransfer,Camera]
})
export class GalleryPage implements OnInit {

  images = [
  ];
  user = JSON.parse(localStorage.getItem('ANuser'));
  local;
  self = false;
  local_id;
  data;

  constructor(public action: ActionSheetController, public loading: LoadingController, public alert: AlertController, public nav: NavController, public api: ApiService, public navparams: NavparamsService,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService, public modal: ModalController, public route: ActivatedRoute) {
    
    if (this.route.snapshot.params.id) {
      this.self = true;
      if (this.navparams.getParam()) {
        this.self = false;
        this.user = this.navparams.getParam();
      }
    }else{
      this.data = this.navparams.getParam();
      if (this.data && this.data.type && this.data.type == 'local' ) {
        this.self = this.data.self;
        this.local_id = this.data.id
        this.user = this.data.user;
      }
    }
  }

  ngOnInit() {
    this.loadGallery();
  }
  loadGallery()
  {
    if (this.data && this.data.type && this.data.type == 'local' ) {
      this.api.getLocalGallery(this.local_id).subscribe((data:any)=>{
        this.local = data[0];
        this.images = data[1];
      })
    }else{
      this.api.getGallery(this.user.id).subscribe((data:any)=>{
        this.images = data;
      })
    }
  }

  async takePhoto()
  {
  	const action = await this.action.create({header:"Subir imagen", buttons: [{
  		text:"Tomar foto", icon: "camera",handler:()=>{
  			this.loadImage(this.camera.PictureSourceType.CAMERA)
  		}
  	},{
  		text:"Seleccionar de galería", icon: "image-outline", handler:()=>{
  			this.loadImage(this.camera.PictureSourceType.PHOTOLIBRARY)
  		}
  	}]})

  	return action.present();
  }

  loadImage(type)
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: type,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.api.fixMargin();
     if (this.local_id) {
       this.uploadToLocalGallery(imageData);
     }else{
       this.uploadToGallery(imageData);
     }

    }, (err) => {
     // Handle error
    });
  }

  uploadToGallery(uri)
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
        params: {user_id:this.user.id},
        headers: {}
    }

    fileTransfer.upload(uri, this.api.url+'/uploadToGallery', options)
     .then((data) => {

      this.loadGallery();

  		// this.images = JSON.parse(data['response'])[0]

     }, (err) => {
       // error
     })
  }

  uploadToLocalGallery(uri)
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
        params: {user_id:this.user.id,id:this.local_id},
        headers: {}
    }

    fileTransfer.upload(uri, this.api.url+'/uploadToLocalGallery', options)
     .then((data) => {

       this.loadGallery();

      // this.images = JSON.parse(data['response'])[0]

     }, (err) => {
       // error
     })
  }

  async verImage(im)
  {
  	const modal = await this.modal.create({
  		component: VerImagenPage,
  		componentProps: {"im": im},
  		cssClass: 'ver-galeria'
  	});

  	return modal.present();
  }

}
