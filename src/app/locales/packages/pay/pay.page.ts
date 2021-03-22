import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../../../services/api.service';
import { EventsService } from '../../../services/events.service';
import { NavparamsService } from '../../../services/navparams.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  precio;
  package;
  user = JSON.parse(localStorage.getItem('ANuser'));

  cards;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public api: ApiService,
  	public alertCtrl: AlertController, public route: ActivatedRoute, public events: EventsService, public navparams: NavparamsService) {

  	this.package = this.navparams.getParam();
  	console.log(this.package);
  	this.precio = this.package.price;
  }

  ngOnInit() {

    this.api.getCards(this.user.id).subscribe(data=>{
      this.cards = data;
    })
    
    this.validation_messages = {
      'card': [
        { type: 'required', message: 'El número de la tarjeta es requerido' },
        { type: 'max', message: 'La tarjeta debe tener un máximo de 16 caracteres' },
      ],
      'cvc': [
        { type: 'required', message: 'El campo cvc es requerido' },
        { type: 'minlength', message: 'El cvc tener al menos 3 caracteres' },
        { type: 'max', message: 'El cvc debe tener 3 caracteres' }
      ],
      'exp_m': [
        { type: 'required', message: 'El mes de expiración es requerido' },
      ],
      'exp_y': [
        { type: 'required', message: 'El año de expiración es requerido' },
        { type: 'minlength', message: 'El año tener al menos 4 caracteres' },
        { type: 'max', message: 'Ingrese un año válido' }
      ],
    };

    this.validations_form = this.formBuilder.group({
      id: new FormControl(this.user.id),
      card: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.max(9999999999999999),
      ])),
      cvc: new FormControl(null, Validators.compose([
        Validators.minLength(3),
        Validators.max(999),
        Validators.required,
      ])),
      exp_m: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      exp_y: new FormControl(null, Validators.compose([
      	Validators.minLength(4),
        Validators.max(9999),
        Validators.required
      ])),
      price: new FormControl(this.precio)
    });
  }

  viewCards()
  {
    let cards = [];

    for (let i in this.cards)
    {
      let a = this.cards[i];
      cards.push({
        type: 'radio',
        name: 'card',
        value: JSON.stringify(a),
        label: a.card.toString().substr(a.card.toString().length-4).padStart(a.card.toString().length-4,'*')
      })
    }

    this.alertCtrl.create({message:"Selecciona una tarjeta:", inputs: cards, buttons: [
    {
      text:"Usar",
      handler:(a)=>{
        if (!a) {
          return false;
        }
        a = JSON.parse(a);
        console.log(a);
        this.validations_form.patchValue({
          card: a['card'],
          cvc: a['cvc'],
          exp_m: a['exp_m'].toString().padStart(2,'0'),
          exp_y: a['exp_y'],
        })
      }
    },{
      text:'Eliminar',
      handler:(a)=>{
        if (!a) {
          return false;
        }
        a = JSON.parse(a);
        console.log(a);

        this.alertCtrl.create({message:"Desea eliminar la tarjeta seleccionada?", buttons: [{
          text: "Si",
          handler:()=>{

            this.api.deleteCard(a.id).subscribe(data=>{
              this.cards = data;
              if (cards.length > 0) {
                this.viewCards();
              }
            });
          }
        },{
          text:"No",
          handler:()=>{
            this.viewCards();
          }
        }]}).then(a=>a.present());
      }
    }/*,{
      text:"Cancelar"
    }*/
    ]}).then(a=>a.present());
  }

  pagar(values)
  {
  	this.loadingCtrl.create().then(l=>{
  		l.present();
	  	this.api.exampleStripe(values).subscribe(data=>{
	      console.log(data);

	      l.dismiss();

	      this.loadingCtrl.create().then(l=>{
	        l.present();
	        this.api.payPackage({id:this.package.id,user_id:this.user.id}).subscribe(data=>{

	        //   localStorage.setItem('carrito',JSON.stringify(data));
	        //   // this.establishments = data;
	        //   this.events.publish('reloadCarta');
	        //   this.events.publish('reloadCarrito');

	          this.alertCtrl.create({message:"Gracias por su compra! Su paquete puede ser visto desde el perfil."}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000)});

	          l.dismiss();

	          this.navCtrl.back();

	        })
	      })

	    },e=>{

	      l.dismiss();
	      // if (e.error == 'error') {
	      this.alertar('Ha ocurrido un error al procesar el pago, verifique los datos ingresados');
	      // }
	    })
  	})
  }

  alertar(msg) {
  	this.alertCtrl.create({message:msg}).then(a=>{
  		a.present();
  	}) 
  }
}
