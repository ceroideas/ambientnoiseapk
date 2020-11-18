import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ApiService } from '../../services/api.service';
import { NavparamsService } from '../../services/navparams.service';
import { EventsService } from '../../services/events.service';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-nueva-sala',
  templateUrl: './nueva-sala.page.html',
  styleUrls: ['./nueva-sala.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevaSalaPage implements OnInit {

  validations_form1: FormGroup;
  validation_messages1: any;

  user = JSON.parse(localStorage.getItem('ANuser'));

  edit;

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService, public route: ActivatedRoute, public navparams: NavparamsService) {

  }

  ngOnInit() {
  	this.validation_messages1 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'description': [
        { type: 'required', message: 'El campo descripción es requerido' },
      ],
      'image': [
        { type: 'required', message: 'Seleccione una imagen para la sala' },
      ]
    };

    this.validations_form1 = this.formBuilder.group({
      id: new FormControl(null),
      establishment_id: new FormControl(this.route.snapshot.params.id, Validators.compose([
        Validators.required
      ])),
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      image: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });

    if (this.navparams.getParam()) {
  		let data = this.navparams.getParam();
  		this.edit = data.id;

  		this.validations_form1.patchValue({
  			id:data.id,
  			establishment_id:data.establishment_id,
			name:data.title,
			description:data.description,
			image:data.avatar
  		})
  	}
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

  publishRoom()
  {
  	this.loading.create().then(l=>{
        l.present();
        this.api.saveRoom(this.validations_form1.value).subscribe(data=>{
          l.dismiss();
          this.nav.back();
          this.events.publish('reloadRooms');

          let msg = "La nueva sala ha sido creada";

          if (this.edit) {
          	msg = "La sala ha sido actualizada";
          }
          this.alert.create({message:msg}).then(a=>{
            a.present();
          })
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar la sala"}).then(a=>{
            a.present();
          })
        })
    })
  	console.log(this.validations_form1.value);
  }

}
