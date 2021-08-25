import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { EventsService } from '../../services/events.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nuevo-plato',
  templateUrl: './nuevo-plato.page.html',
  styleUrls: ['./nuevo-plato.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevoPlatoPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;

  menu_id = this.route.snapshot.params.id;

  constructor(public alertCtrl: AlertController, public nav: NavController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder, public events: EventsService, 
  	public api: ApiService, private camera: Camera, private transfer: FileTransfer, public toast: ToastController, private route: ActivatedRoute,) { }

  ngOnInit() {

  	this.validation_messages = {
      'name': [
        { type: 'required', message: 'El campo titulo es requerido' },
      ],
      'description': [
        { type: 'required', message: 'El campo descripción es requerido' },
      ],
      'price': [
        { type: 'required', message: 'El campo precio es requerido' },
      ],
      'image': [
        { type: 'required', message: 'Seleccione una imagen para el evento' },
      ],
    };

    this.validations_form = this.formBuilder.group({
      title: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      price: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      image: new FormControl(/*"https://m.media-amazon.com/images/I/41br4ayjw4L._AC_SS350_.jpg"*/null, Validators.compose([
        Validators.required
      ])),
      menu_id: new FormControl(this.menu_id),
    });
  }

  savePlate()
  {
  	this.loadingCtrl.create().then(l=>{
  		l.present();

  		this.api.addMenuPlate(this.validations_form.value).subscribe(data=>{
			l.dismiss();
			this.events.publish('loadMenus');
			this.nav.pop();
		})
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
        headers: {}
    }

    fileTransfer.upload(uri, this.api.url+'/uploadImage', options)
     .then((data) => {

      this.validations_form.patchValue({
      image: JSON.parse(data['response'])[0]
    });

     }, (err) => {
       // error
     })
  }

}
