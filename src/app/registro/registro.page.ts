import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';

import { ConfirmedValidator } from './confirmed';

import * as moment from 'moment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  show_password_0 = 'password';
  show_password_1 = 'password';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController) { }

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
      'birthday': [
        { type: 'required', message: 'El campo de fecha de nacimiento es requerido' },
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
      name: new FormControl(null, Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      last_name: new FormControl(null, Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      birthday: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        Validators.required
      ])),
      repeat_password: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ])),
      business: new FormControl(null)
    },{
      validator: ConfirmedValidator('password', 'repeat_password')
    });
  }

  changeView(i)
  {
    if (this['show_password_'+i] == 'password') {
      this['show_password_'+i] = 'text';
    }else{
      this['show_password_'+i] = 'password';
    }
  }

  registerUser(values)
  {

    let age = (Math.ceil(moment().diff(moment(this.validations_form.value.birthday),'days')/365.5));

    if (age < 18) {
      this.alertCtrl.create({message:"Debes tener más de 18 años de edad para utilizar Ambient Noise!",buttons: [{
        text:"Ok"
      }]}).then(a=>{
        a.present();
      });

      return false;
    }
    
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.register(values).subscribe((data:any)=>{

        a.dismiss();

        this.navCtrl.back();

        let msg;
        if (data.role == 2) {
          msg = 'Usuario registrado satisfactoriamente';
        }else if(data.role == 3){
          msg = 'Usuario registrado satisfactoriamente, debe esperar confirmación por parte de un administrador para poder empezar a publicar sus Locales';
        }

        this.alertCtrl.create({message:msg}).then(a=>{
          a.present();
          setTimeout(()=>{a.dismiss()},3000)
        })

      },err=>{
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present(); setTimeout(()=>{a.dismiss()},3000)});
        a.dismiss();
      })

    })

  }

}
