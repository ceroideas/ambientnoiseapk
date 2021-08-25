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
  selector: 'app-nueva-oferta',
  templateUrl: './nueva-oferta.page.html',
  styleUrls: ['./nueva-oferta.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevaOfertaPage implements OnInit {

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
      'type': [
        { type: 'required', message: 'El campo tipo es requerido' },
      ],
      'quantity': [
        { type: 'required', message: 'El campo de cantidad es requerido' },
      ],
      'from': [
        { type: 'required', message: 'Debe indicar la validez de la oferta' },
      ],
      'to': [
        { type: 'required', message: 'Debe indicar la validez de la oferta' },
      ],
      'local_id': [
        { type: 'required', message: 'Seleccione el local donde aplicará la oferta' },
      ],
      'image': [
        { type: 'required', message: 'Seleccione una imagen para la oferta' },
      ],
      'uses': [
        { type: 'required', message: 'Indique cuantas veces puede ser usada la oferta, 0 ilimitada' },
      ],
    };

    this.validations_form1 = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      type: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      quantity: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      quantityOff: new FormControl(null),
      from: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      to: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      image: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      local_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ])),
      user_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ])),
      uses: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
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

  publishOffer()
  {
  	this.loading.create().then(l=>{
        l.present();
        this.api.saveOffer(this.validations_form1.value).subscribe(data=>{
          l.dismiss();
          this.nav.pop();
          this.events.publish('reloadOffers');
          this.alert.create({message:"La nueva oferta ha sido creada."}).then(a=>{
            a.present(); setTimeout(()=>{a.dismiss()},3000);
          })
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar la oferta"}).then(a=>{
            a.present(); setTimeout(()=>{a.dismiss()},3000);
          })
        })
    })
  	console.log(this.validations_form1.value);
  }

}
