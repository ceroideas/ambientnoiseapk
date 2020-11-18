import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  show_password_0 = 'password';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService, public alertCtrl: AlertController, public socket: SocketService) { }

  ngOnInit() {
    this.validation_messages = {
      'password': [
        { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
        { type: 'pattern', message: 'La contraseña debe contener al menos un caracter en mayúscula y un número' }
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
    };

    this.validations_form = this.formBuilder.group({
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  ionViewDidEnter()
  {
    localStorage.removeItem('ANuser');
    localStorage.removeItem('carrito');
  }

  // changeLocal()
  // {
  // 	if (this.local) {
  // 		this.local = null;
  // 	}else{
  // 		this.local = 1;
  // 	}
  // }

  changeView(i)
  {
    if (this['show_password_'+i] == 'password') {
      this['show_password_'+i] = 'text';
    }else{
      this['show_password_'+i] = 'password';
    }
  }

  loginUser(values)
  {
    
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.login(values.email, values.password).subscribe((data:any)=>{

        a.dismiss();

        localStorage.setItem('ANuser',JSON.stringify(data[0]));


        if (localStorage.getItem('onesignal_id')) {
          
          let user = data[0];
          let onesignal_id = localStorage.getItem('onesignal_id');

          this.api.saveOneSignalId({id:user.id,onesignal_id:onesignal_id})
          .subscribe(
            data => {console.log('ok');},
            err => {console.log(err);}
          );
        }

        // this.socket.startConnection();

        if (data[0].role == 2) {
          this.navCtrl.navigateRoot('tabs');

          localStorage.setItem('carrito',JSON.stringify(data[1]));
        }else if(data[0].role == 3){
          this.navCtrl.navigateRoot('local');
        }

      },err=>{
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present()});
        a.dismiss();
      })

    })

  }

}
