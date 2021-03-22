import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular'

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { File } from '@ionic-native/file';

import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';
import { NavparamsService } from '../../services/navparams.service';
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
  latlng:any = {lat:null,lng:null};

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
  municipio;

  // https://i.ytimg.com/vi/AXdKckpQf_E/maxresdefault.jpg

  logo = "";
  marker = "";
  main = "";

  user = JSON.parse(localStorage.getItem('ANuser'));

  edit = null;

  weekDays = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ];

  constructor(public nav: NavController, public alert: AlertController, public loading: LoadingController, public api: ApiService, private formBuilder: FormBuilder,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public events: EventsService, public navparams: NavparamsService) { }

  ngOnInit() {
    this.api.getCategories().subscribe(data=>{
      this.ambients = data[0];
      this.musics = data[1];

      console.log(data);
    })

    this.validation_messages1 = {
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'place_id': [
        { type: 'required', message: 'El campo "place id" es requerido' },
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
      place_id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      address: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      rrpp: new FormControl(null),
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

    /**/

    let data = this.navparams.getParam();

    if (data && data.type && data.type == 'edit-local') {

      data = data.data;

      console.log(data);

      this.edit = data.id;

      this.address = data.address;
      this.province = data.locality ? data.locality.name : '';
      this.municipio = data.city;
      
      this.validations_form1.patchValue({
        'name':data.title,
        'address':data.address,
        'place_id':data.place_id,
        'rrpp':data.rrpp,
        'description':data.description,
      })

      let m = [];
      let a = [];

      data.musics.forEach((v)=>{
        m.push(v.music.title);
      })
      data.ambients.forEach((v)=>{
        a.push(v.ambient.title);
      })

      this.validations_form2.patchValue({
        'ambients':a,
        'musics':m,
        'minumum':data.min_buy,
        'average':data.min_time,
        'capacity':data.capacity,
      })

      this.logo = data.avatar;
      this.marker = data.marker;
      this.main = data.main;
      
      let days = [];

      data.schedule.forEach((v)=>{
        console.log(moment(`2000-01-01 ${v.hour_from}:${v.minutes_from}`).format("YYYY-MM-DDThh:mm:ssTZD"))
        days.push({
          day:v.day.toString(),
          from:moment(`2000-01-01 ${v.hour_from}:${v.minutes_from}`).format("HH:mm"),
          to:moment(`2000-01-01 ${v.hour_to}:${v.minutes_to}`).format("HH:mm")
        });
      })

      this.days = days;

      console.log(this.days);

      this.latlng.lat = data.lt;
      this.latlng.lng = data.ln;

    }
  }

  ionViewDidEnter()
  {
    this.initAutocomplete();
  }

  prevStep()
  {
    this.step-=1;
  }

  nextStep(h = null)
  {
    if (h) {

      console.log(this.days);

      for(let i in this.days)
      {
        let day = this.days[i].day;
        let from = this.days[i].from;
        let to = this.days[i].to;

        if (!day || !from || !to) {
          return this.alert.create({message:"Complete todos los campos en el horario"}).then(a=>{a.present(), setTimeout(()=>{a.dismiss()},2000); });
        }
      }
    }

    if (this.step == 4) {

        let newDays = [];

        for (let i in this.days)
        {
          let day = this.days[i].day;

          let from_hour;
          let from_min;
          let to_hour;
          let to_min;

          if (moment(this.days[i].from).format() == 'Invalid date') {
            console.log(this.days);

            from_hour = moment("2020-01-01 "+this.days[i].from).format('HH');
            from_min = moment("2020-01-01 "+this.days[i].from).format('mm');

            to_hour = moment("2020-01-01 "+this.days[i].to).format('HH');
            to_min = moment("2020-01-01 "+this.days[i].to).format('mm');

          }else{

            from_hour = moment(this.days[i].from).format('HH');
            from_min = moment(this.days[i].from).format('mm');

            to_hour = moment(this.days[i].to).format('HH');
            to_min = moment(this.days[i].to).format('mm');
          }

          newDays.push({day:day,from_hour:from_hour,to_hour:to_hour,from_min:from_min,to_min:to_min});
        }

        let data = {
          edit: this.edit,
          user_id:this.user.id,
          name:this.validations_form1.value.name,
          rrpp:this.validations_form1.value.rrpp,
          place_id:this.validations_form1.value.place_id,
          address:this.address,
          province:this.province,
          municipio:this.municipio,
          description:this.validations_form1.value.description,
          ambients:this.validations_form2.value.ambients,
          musics:this.validations_form2.value.musics,
          minumum:this.validations_form2.value.minumum,
          average:this.validations_form2.value.average,
          capacity:this.validations_form2.value.capacity,
          logo:this.logo,
          marker:this.marker,
          main:this.main,
          days: newDays,
          lat: this.latlng.lat,
          lng: this.latlng.lng,
        }

      this.loading.create().then(l=>{
        l.present();
        this.api.saveStablishment(data).subscribe(data=>{
          l.dismiss();
          this.nav.pop();
          this.events.publish('reloadLocals');
          if (this.edit) {
            this.alert.create({message:"El local ha sido modificado. Espere a que un administrador lo reactive."}).then(a=>{
              a.present(); setTimeout(()=>{a.dismiss()},2000);
            })
          }else{
            this.alert.create({message:"El nuevo local ha sido creado. Debe esperar a que un administrador lo active."}).then(a=>{
              a.present(); setTimeout(()=>{a.dismiss()},2000);
            })
          }
        },e=>{
          l.dismiss();
          this.alert.create({message:"Ha ocurrido un error al intentar publicar el local"}).then(a=>{
            a.present(); setTimeout(()=>{a.dismiss()},2000);
          })
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
      types: ['geocode','establishment']
    };

    this.autocomplete = new google.maps.places.Autocomplete(input, options);

    this.autocomplete.setComponentRestrictions(
          {'country': ['es', 'it']});

    let fillInAddress = ()=> {
      // Get the place details from the autocomplete object.
      var arr = this.autocomplete.getPlace();
      console.log(arr);

      this.validations_form1.patchValue({
        'name': (arr['name'] ? arr['name'] : this.validations_form1.value.name),
        'place_id':arr.place_id
      })

      if (arr['opening_hours']) {

        this.days = [];

        for( let i in arr['opening_hours']['weekday_text'] ) {
          let d = arr['opening_hours']['weekday_text'][i];

          let day = d.split(': ');

          if (day[1] == "Abierto las 24 horas") {
            this.days.push({
                day: this.weekDays.findIndex(x=>x==day[0]).toString(),
                from: '00:00',
                to: '23:59'});
          }else{

          if (day[1] != 'Cerrado') {
            let hours = day[1].split('–');

              this.days.push({
                day: this.weekDays.findIndex(x=>x==day[0]).toString(),
                from: hours[0].split(', ')[0],
                to: hours[1].split(', ')[0]});
            }
          }
        }

        console.log(this.days);
      }

      // this.validations_form1.patchValue({
      // })
      // (document.getElementById('searchTextField') as HTMLInputElement).value = "";

      this.latlng = {lat:arr.geometry.location.lat(),lng:arr.geometry.location.lng()};

      geocoder.geocode({'location': this.latlng}, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              // $('.local span').text(results[0].formatted_address).attr('title', results[0].formatted_address);
              // if (!this.address) {
              this.address = results[0].formatted_address;
              // }
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
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
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
              this.municipio = arr[i].address_components[0].long_name;
              this.province = arr[i].address_components[1].long_name;

              console.log(this.municipio);
              console.log(this.province);
            }else if(addressType == 'administrative_area_level_2'){
              this.province = arr[i].address_components[0].long_name;

              console.log(this.province);
            }else if(addressType == 'administrative_area_level_4'){
              this.municipio = arr[i].address_components[0].long_name;

              console.log(this.municipio);
            }
            // if (addressType == 'country') {
            //   // console.log(arr[i].address_components[0].short_name);
            //   $('#flag').attr('src','https://www.countryflags.io/'+arr[i].address_components[0].short_name+'/shiny/64.png').show();
            // }
        }
    }
  }

}
