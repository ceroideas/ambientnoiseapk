import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file';

import { ApiService } from '../../services/api.service';
import * as $ from 'jquery';
import * as moment from 'moment';


declare var google;

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
  providers: [FileTransfer,Camera]
})
export class NuevoPage implements OnInit {

  todo:any = {};
  step = 1;
  autocomplete;
  latlng:any;

  ambients = [];
  musics = [];

  validations_form1: FormGroup;
  validation_messages1: any;

  validations_form2: FormGroup;
  validation_messages2: any;

  errorMessage: string = '';

  days = [];

  address;
  province;

  logo = "https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg";
  main = "https://s3-us-west-2.amazonaws.com/lasaga-blog/media/original_images/grupo_imagen.jpg";

  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder, private camera: Camera, private transfer: FileTransfer) { }

  ngOnInit() {
    this.api.getCategories().subscribe(data=>{
      this.ambients = data[1];
      this.musics = data[0];

      console.log(data);
    })

    this.validation_messages1 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'address': [
        { type: 'required', message: 'El campo dirección es requerido' },
      ],
      'description': [
        { type: 'required', message: 'El campo descripción es requerido' },
      ],
    };

    this.validations_form1 = this.formBuilder.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      address: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ])),
    });

    //

    this.validation_messages2 = {
      'ambients': [
        { type: 'required', message: 'El campo ambiente es requerido' },
      ],
      'musics': [
        { type: 'required', message: 'El campo musica es requerido' },
      ],
      'minumum': [
        { type: 'required', message: 'El campo compra mínima es requerido' },
      ],
      'average': [
        { type: 'required', message: 'El campo tiempo mínimo es requerido' },
      ],
      'capacity': [
        { type: 'required', message: 'El campo capacidad es requerido' },
      ],
    };

    this.validations_form2 = this.formBuilder.group({
      ambients: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      musics: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      minumum: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      average: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      capacity: new FormControl(null, Validators.compose([
        Validators.required
      ])),
    });
  }

  ionViewDidEnter()
  {
    this.initAutocomplete();
  }

  nextStep(h = null)
  {
    if (h) {
      for(let i in this.days)
      {
        let day = this.days[i].day;
        let from = moment(this.days[i].from).format('HH:mm');
        let to = moment(this.days[i].to).format('HH:mm');

        if (!day || from == 'Invalid date' || to == 'Invalid date') {
          return this.alert.create({message:"Complete todos los campos en el horario"}).then(a=>{a.present()});
        }
      }
    }

    if (this.step == 4) {

        let newDays = [];

        for (let i in this.days)
        {
          let day = this.days[i].day;
          
          let from_hour = moment(this.days[i].from).format('HH');
          let from_min = moment(this.days[i].from).format('mm');

          let to_hour = moment(this.days[i].to).format('HH');
          let to_min = moment(this.days[i].to).format('mm');

          newDays.push({day:day,from_hour:from_hour,to_hour:to_hour,from_min:from_min,to_min:to_min});
        }

        let data = {
          user_id:this.user.id,
          name:this.validations_form1.value.name,
          address:this.address,
          province:this.province,
          description:this.validations_form1.value.description,
          ambients:this.validations_form2.value.ambients,
          musics:this.validations_form2.value.musics,
          minumum:this.validations_form2.value.minumum,
          average:this.validations_form2.value.average,
          capacity:this.validations_form2.value.capacity,
          logo:this.logo,
          main:this.main,
          days: newDays,
          lat: this.latlng.lat,
          lng: this.latlng.lng,
        }

      this.api.saveStablishment(data).subscribe(data=>{
        
        this.nav.back();

        this.alert.create({message:"Local creado (prueba)"}).then(a=>{
          a.present();
        })
      })

    }else{
  	  this.step++;
    }
  }

  initAutocomplete()
  {
    var geocoder = new google.maps.Geocoder;
    
    var input = document.getElementById('searchTextField');
    var countryRestrict = {'country': ['es','it']};
    var options = {
      types: ['geocode']
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.autocomplete.setComponentRestrictions(
          {'country': ['es', 'it']});

    let fillInAddress = ()=> {
      // Get the place details from the autocomplete object.
      var arr = this.autocomplete.getPlace();
      // (document.getElementById('searchTextField') as HTMLInputElement).value = "";

      this.latlng = {lat:arr.geometry.location.lat(),lng:arr.geometry.location.lng()};

      geocoder.geocode({'location': this.latlng}, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              // $('.local span').text(results[0].formatted_address).attr('title', results[0].formatted_address);
              this.address = results[0].formatted_address;
              // (document.getElementById('searchTextField') as HTMLInputElement).value = results[0].formatted_address;

              // console.log(this.validations_form1.value.address);
              this.getAddress(results);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });

    }

    this.autocomplete.addListener('place_changed', fillInAddress);
  }

  addDay()
  {
    this.days.push({day:null,from:null,to:null});
  }

  removeDay(i)
  {
    this.days.splice(i,1);
  }

  loadImage(type)
  {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):

     this.uploadImage(imageData,type);

    }, (err) => {
     // Handle error
    });
  }

  uploadImage(uri,type)
  {
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

      this[type] = JSON.parse(data['response'])[0];

     }, (err) => {
       // error
     })
  }

  getAddress(arr)
  {
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        var addressType = arr[i].types[0];
        if (addressType) {
            if (addressType == 'locality') {
              // console.log(arr[i].address_components[0].short_name);
              this.province = arr[i].address_components[1].short_name;

              console.log(this.province);
              // $('#postal_code_here').text(arr[i].address_components[0].short_name);
            }
            // if (addressType == 'country') {
            //   // console.log(arr[i].address_components[0].short_name);
            //   $('#flag').attr('src','https://www.countryflags.io/'+arr[i].address_components[0].short_name+'/shiny/64.png').show();
            // }
        }
    }
  }

}
