import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.page.html',
  styleUrls: ['./nuevo-evento.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevoEventoPage implements OnInit {

  todo:any = {};
  type;

  validations_form1: FormGroup;
  validation_messages1: any;

  user = JSON.parse(localStorage.getItem('ANuser'));

  locals:any;

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService) { }

  ngOnInit() {

  	this.api.getMyStablishments(this.user.id).subscribe((data:any)=>{
  		this.locals = data.data;
  	})

  	this.validation_messages1 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'description': [
        { type: 'required', message: 'El campo descripción es requerido' },
      ],
      'date': [
        { type: 'required', message: 'Seleccione el día del evento' },
      ],
      'from': [
        { type: 'required', message: 'Debe indicar la validez del evento' },
      ],
      'to': [
        { type: 'required', message: 'Debe indicar la validez del evento' },
      ],
      'local_id': [
        { type: 'required', message: 'Seleccione el local donde aplicará el evento' },
      ],
      'image': [
        { type: 'required', message: 'Seleccione una imagen para el evento' },
      ],
    };

    this.validations_form1 = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      date: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      from: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      to: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      participations: new FormControl(null),
      image: new FormControl(null, Validators.compose([
        //'https://www.marquid.com/wp-content/uploads/2017/06/6197706_orig.jpg'
        Validators.required
      ])),
      local_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ])),
      user_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ]))
    });
  }

  loadImage()
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):

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

      this.validations_form1.patchValue({
  		image: JSON.parse(data['response'])[0]
  	});

     }, (err) => {
       // error
     })
  }

  restartValue()
  {
  	this.validations_form1.patchValue({
  		quantity: null
  	});
  }

  publishEvent()
  {
  	this.loading.create().then(l=>{
        l.present();
        this.api.saveEvent(this.validations_form1.value).subscribe(data=>{
          l.dismiss();
          this.nav.back();
          this.events.publish('reloadEvents');
          this.alert.create({message:"El nuevo evento ha sido creado, debe esperar a que un administrador lo active"}).then(a=>{
            a.present();
          })
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar el evento"}).then(a=>{
            a.present();
          })
        })
    })
  	console.log(this.validations_form1.value);
  }

}
