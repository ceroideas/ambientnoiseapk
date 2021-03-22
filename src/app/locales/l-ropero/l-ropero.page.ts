import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-l-ropero',
  templateUrl: './l-ropero.page.html',
  styleUrls: ['./l-ropero.page.scss'],
})
export class LRoperoPage implements OnInit {

  selected = -1;
  roperos:any = []
  locals;
  local_id;
  user = JSON.parse(localStorage.getItem('ANuser'));

  constructor(public nav: NavController, public api: ApiService, public events: EventsService, public loading: LoadingController, public alertCtrl: AlertController, public route: ActivatedRoute) { }

  ngOnInit() {
    this.api.getMyStablishments(this.user.id,1).subscribe((data:any)=>{
      this.locals = data.data;
      this.local_id = parseInt(this.route.snapshot.params.id);
      this.retrieveClosets();
    })
  }

  retrieveClosets()
  {
    this.loading.create().then(l=>{
      l.present();
      this.api.retrieveClosets({id:this.local_id}).subscribe(data=>{
        this.roperos = data;
        l.dismiss();
      })
    })
  }

  collapse(e)
  {
    let h = (document.getElementById('ropero-items-'+e) as HTMLElement).offsetHeight;

    if (h != 0) {

      (document.getElementById('ropero-items-'+e) as HTMLElement).style.height = "0px";

    }else{
      let arr = document.getElementById('ropero-items-'+e).getElementsByClassName('menu-item');
      let h = 0;
      for( let i in arr){
        if ((arr[i] as HTMLElement).offsetHeight != undefined) {
          h+=(arr[i] as HTMLElement).offsetHeight;
        }
      }
      (document.getElementById('ropero-items-'+e) as HTMLElement).style.height = h+"px";
    }

  }

  asignar(id)
  {
    this.alertCtrl.create({message:"Asigne la prenda a una percha",
    inputs: [
    {
      type:'number',
      placeholder: 'Nº de percha',
      name: 'percha'
    }
    ],
    buttons: [
    {
      text: "Aceptar",
      handler: (a)=>{

        this.loading.create().then(l=>{
          l.present();

          this.api.asignar({id:id, percha: a.percha}).subscribe(data=>{
            l.dismiss();

            this.roperos = data;
          })
        })
      }
    },{
      text: "No"
    }
    ]}).then(a=>a.present());
  }
  entregar(id)
  {
    this.alertCtrl.create({message:"Desea marcar el ropero como entregado?", buttons: [
    {
      text: "Si",
      handler: ()=>{

        this.loading.create().then(l=>{
          l.present();

          this.api.entregar({id:id}).subscribe(data=>{
            l.dismiss();

            this.roperos = data;
          })
        })
      }
    },{
      text: "No"
    }
    ]}).then(a=>a.present());
  }

}
