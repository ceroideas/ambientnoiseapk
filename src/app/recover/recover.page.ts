import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';

import { ConfirmedValidator } from '../registro/confirmed';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;

  validations_form2: FormGroup;
  validation_messages2: any;

  validations_form3: FormGroup;
  validation_messages3: any;

  errorMessage: string = '';

  show_password_0 = 'password';
  show_password_1 = 'password';

  step = 1;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController) {
  	function makeid() {
      var text = "";
      var possible = "0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }

    localStorage.setItem('ANcode', makeid());
  }

  ngOnInit() {
    this.validation_messages = {
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
    };

    this.validation_messages2 = {
      'code': [
        { type: 'required', message: 'Ingrese el código recibido' },
      ],
    };

    this.validation_messages3 = {
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
        { type: 'pattern', message: 'La contraseña debe contener al menos un caracter en mayúscula y un número' }
      ],
      'repeat_password': [
        { type: 'required', message: 'El campo repetir contraseña es requerido' },
        { type: 'confirmedValidator', message: 'Las contraseñas deben ser iguales' },
      ],
    };

    this.validations_form = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      code: new FormControl(localStorage.getItem('ANcode')),
    });

    this.validations_form2 = this.formBuilder.group({
      code: new FormControl(null, Validators.compose([
        Validators.required,
      ])),
    });

    this.validations_form3 = this.formBuilder.group({
      email: new FormControl(null),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        Validators.required
      ])),
      repeat_password: new FormControl(null, Validators.compose([
        Validators.required
      ]))
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

  validarEmail(values)
  {
    
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.sendCode(values).subscribe((data:any)=>{

        this.step = 2;

        a.dismiss();

        this.alertCtrl.create({message:'Ingrese el código recibido',buttons: [{text:"Ok"}]}).then(a=>a.present());

      },err=>{
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
      })

    })

  }

  validarCodigo(values)
  {
  	if (values.code == localStorage.getItem('ANcode')) {
  		this.step = 3;
  	}else{
  		this.alertCtrl.create({message:'El código ingresado no es correcto',buttons: [{text:"Ok"}]}).then(a=>a.present());
  	}
  }

  changePassword(values)
  {
  	this.validations_form3.patchValue({
  		email:this.validations_form.value.email
  	});

  	this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.changePassword(this.validations_form3.value).subscribe((data:any)=>{

        this.step = 2;

        a.dismiss();

        this.alertCtrl.create({message:'Has cambiado tu contraseña!'}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});

        this.navCtrl.back();

      },err=>{
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
      })

    })

  }

}
