import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

import { ConfirmedValidator } from '../../registro/confirmed';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  providers: [FileTransfer,Camera]
})
export class AjustesPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;

  errorMessage:any;

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService) { }

  ngOnInit() {
  	this.validation_messages = {
      'name': [
        { type: 'required', message: 'El campo de nombre es requerido' },
        { type: 'minlength', message: 'La nombre debe tener al menos 4 caracteres' }
      ],
      'last_name': [
        { type: 'required', message: 'El campo de apellido es requerido' },
        { type: 'minlength', message: 'La apellido debe tener al menos 4 caracteres' }
      ],
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
        { type: 'pattern', message: 'La contraseña debe contener al menos un caracter en mayúscula y un número' }
      ],
      'repeat_password': [
        { type: 'required', message: 'El campo repetir contraseña es requerido' },
        { type: 'confirmedValidator', message: 'Las contraseñas deben ser iguales' },
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
    };

    this.validations_form = this.formBuilder.group({
      name: new FormControl(this.user.name, Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      last_name: new FormControl(this.user.last_name, Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        // Validators.required
      ])),
      repeat_password: new FormControl(null, Validators.compose([
        // Validators.required
      ])),
      image: new FormControl(this.user.avatar, Validators.compose([
        // Validators.required
      ])),
      user_id: new FormControl(this.user.id, Validators.compose([
        // Validators.required
      ])),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    },{
      validator: ConfirmedValidator('password', 'repeat_password')
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

      this.user.avatar = JSON.parse(data['response'])[0];

      this.validations_form.patchValue({
  		image: JSON.parse(data['response'])[0]
  	});

     }, (err) => {
       // error
     })
  }

  updateUser()
  {
  	this.loading.create().then(a=>{

      a.present();

      this.api.updateUser(this.validations_form.value).subscribe((data:any)=>{

        a.dismiss();

        localStorage.setItem('ANuser', JSON.stringify(data));

        this.nav.back();

        let msg = 'Usuario actualizado satisfactoriamente';

        this.events.publish('updateUser');

        this.alert.create({message:msg}).then(a=>{
          a.present();
        })

      },err=>{
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alert.create({message:this.errorMessage}).then(al=>{al.present()});
        a.dismiss();
      })

    })
  }

}
