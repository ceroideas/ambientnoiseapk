import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular'
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Facebook } from '@ionic-native/facebook/ngx';

import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [Facebook, SignInWithApple]
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  show_password_0 = 'password';

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService,
    public alertCtrl: AlertController, public socket: SocketService, private fb: Facebook, public platform: Platform, private signInWithApple: SignInWithApple) { }

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
        localStorage.removeItem('fakeUser');


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
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        this.errorMessage = arr[0][0];
        this.alertCtrl.create({message:this.errorMessage}).then(al=>{al.present();setTimeout(()=>{al.dismiss()},3000)});
      })

    })

  }

  createFakeUser()
  {
    let user = {"id":0,"name":"Invitado","last_name":"","email":"usuario@guest.com","email_verified_at":null,"avatar":"assets/user.jpg","role":2,"status":1,"created_at":"2020-09-21T20:24:14.000000Z","updated_at":"2020-10-31T13:28:55.000000Z","onesignal_id":null}
    localStorage.setItem('ANuser', JSON.stringify(user));
    localStorage.setItem('fakeUser', '1');

    this.navCtrl.navigateRoot('tabs');
  }

  doFbLogin(){
    // const loading = await this.loadingCtrl.create({
    //   message: 'Cargando Facebook...'
    // });
    // this.presentLoading(loading);
    let permission = new Array<string>();

    //the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];

    this.fb.login(permissions)
    .then(response =>{
      let userId = response.authResponse.userID;

      //Getting name and gender properties
      this.fb.api("/me?fields=name,email", permissions)
      .then(user =>{
        this.loadingCtrl.create().then((l)=>{
          l.present();
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          //now we have the users info, let's save it in the NativeStorage
          localStorage.setItem('facebook_user',JSON.stringify(user))

          console.log(user);

          this.api.loginWithFb(user).subscribe(data=>{
            l.dismiss();

            localStorage.setItem('ANuser',JSON.stringify(data[0]));
            localStorage.removeItem('fakeUser');


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
          })

        })

        // this.navCtrl.navigateRoot('main');
        // alert('OK');
        // loading.dismiss();
      })
    }, error =>{
      console.log(error);
      // loading.dismiss();
    });
  }

  doAppleLogin()
  {
    if (this.platform.is('ios')) {
      this.signInWithApple.signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
        ]
      })
      .then((res: AppleSignInResponse) => {

        alert('Send token to apple for verification: ' + res.identityToken);

        let user = {
          name: res.fullName.givenName+' '+res.fullName.familyName,
          email: res.email,
          picture: "assets/apple.png"
        }
        console.log(res,user);

        this.loadingCtrl.create().then((l)=>{
          l.present();
          localStorage.setItem('apple_user',JSON.stringify(user))

          this.api.loginWithFb(user).subscribe(data=>{
            l.dismiss();

            localStorage.setItem('ANuser',JSON.stringify(data[0]));
            localStorage.removeItem('fakeUser');

            if (localStorage.getItem('onesignal_id')) {
              
              let user = data[0];
              let onesignal_id = localStorage.getItem('onesignal_id');

              this.api.saveOneSignalId({id:user.id,onesignal_id:onesignal_id,apple:1})
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
          })

        })

        //

      })
      .catch((error: AppleSignInErrorResponse) => {
        alert(error.code + ' ' + error.localizedDescription);
        console.error("AppleSignInErrorResponse",error);
      });
    }else{
      this.alertCtrl.create({message:"Función solo válida para usuarios de iOS"}).then(a=>{a.present();setTimeout(()=>{a.dismiss()},3000)});
    }
  }

}
