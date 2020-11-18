import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';

@Component({
  selector: 'app-nueva-lista',
  templateUrl: './nueva-lista.page.html',
  styleUrls: ['./nueva-lista.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevaListaPage implements OnInit {

  todo:any = {};
  type;

  validations_form: FormGroup;
  validation_messages: any;

  user = JSON.parse(localStorage.getItem('ANuser'));

  locals:any;

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService, public navparams: NavparamsService) { }

  ngOnInit() {

    this.api.getMyStablishments(this.user.id).subscribe((data:any)=>{
      this.locals = data.data;
    })

    this.validation_messages = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'local_id': [
        { type: 'required', message: 'Seleccione el local donde aplicará el evento' },
      ],
      'image': [
        { type: 'required', message: 'Seleccione una imagen para el evento' },
      ],
    };

    this.validations_form = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      image: new FormControl("https://www.marketingdirecto.com/wp-content/uploads/2019/04/Eventos.jpg", Validators.compose([
        Validators.required
      ])),
      participations: new FormControl(null),
      local_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ])),
      user_id: new FormControl(this.user.id, Validators.compose([
        Validators.required
      ]))
    });
  }

  addGuests() {
  	// if (!this.todo.name) {
  	// 	this.alert.create({message:"Debe añadir nombre a la lista"}).then(a=>{a.present()});
  	// }else{

      this.loading.create().then(l=>{
        l.present();
        this.api.saveList(this.validations_form.value).subscribe(data=>{
          l.dismiss();
          // this.nav.back();
          this.events.publish('reloadLists');
          
          // localStorage.setItem('listName',this.validations_form.value.name);
          this.navparams.setParam(data);
          this.nav.navigateForward('local/listas/lista-detalles');

          this.alert.create({message:"La lista ha sido creada, ahora añada invitados"}).then(a=>{
            a.present();
          })
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar la lista"}).then(a=>{
            a.present();
          })
        })
      })
  	// }
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

      this.validations_form.patchValue({
      image: JSON.parse(data['response'])[0]
    });

     }, (err) => {
       // error
     })
  }

}
