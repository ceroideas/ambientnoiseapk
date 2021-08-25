import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { EventsService } from '../../services/events.service';
import { ApiService } from '../../services/api.service';

import { OneSignal } from '@ionic-native/onesignal/ngx';

import { Keyboard } from '@ionic-native/keyboard/ngx';

import { Router } from '@angular/router';

import * as $ from 'jquery';
import * as moment from 'moment';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [FileTransfer,Camera,Keyboard]
})
export class ChatPage implements OnInit {

  @ViewChild('messages') private messages: any;

  // tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  myMessages = [
  	
  ];

  actualChat;

  text = "";

  constructor(public router: Router, private oneSignal: OneSignal,public nav: NavController, public socket: SocketService, public events: EventsService, public alertCtrl: AlertController, public api: ApiService, public action: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public route: ActivatedRoute, public keyboard: Keyboard) {

    this.events.destroy('addNewMessage');
    this.events.subscribe('addNewMessage',(data:any)=>{
      if (this.actualChat == data.to_id || this.actualChat == data.from_id) {
        this.myMessages.push(data);
        if (this.router.url.indexOf('chat-room/') !== -1) {
          this.api.setSeen(data.from_id).subscribe(()=>{
            console.log('leidos');
            setTimeout(()=>{
              this.events.publish('removeDot',data.from_id);
            },1000)
          })
          setTimeout(()=>{
            $('#messages').scrollTop(document.getElementById('messages').scrollHeight+100);
          },100)
        }
      }
    })

    this.events.destroy('addNewMessage1');
    this.events.subscribe('addNewMessage1',(data:any)=>{
      if (this.actualChat == data.to_id || this.actualChat == data.from_id) {
        this.myMessages.push(data);
        if (this.router.url.indexOf('chat-room/') !== -1) {
          this.api.setSeen(data.to_id).subscribe(data=>{
            console.log('leidos');
          })
          setTimeout(()=>{
            $('#messages').scrollTop(document.getElementById('messages').scrollHeight+100);
          },100)
        }
      }
    })
  }

  addOpenFunctionality()
  {
    let elems = Array.from(document.getElementsByClassName('chat-image'));

    for (let i in elems)
    {
      (elems[i] as any).removeEventListener('click', (e)=>{
        let img = (elems[i] as any).style.backgroundImage;
        img = img.split('url("')
        let newimg = img[1]
        newimg = newimg.split('\")')
        window.open(newimg[0],'_blank');
      });
      (elems[i] as any).addEventListener('click', (e)=>{
        let img = (elems[i] as any).style.backgroundImage;
        img = img.split('url("')
        let newimg = img[1]
        newimg = newimg.split('\")')
        window.open(newimg[0],'_blank');
      });
    }
  }

  ionViewDidEnter()
  {

    window.addEventListener('keyboardDidShow', (e) => {
      console.log('scrolled ok')
      $('#messages').scrollTop(document.getElementById('messages').scrollHeight+100);
    }); 

    this.oneSignal.clearOneSignalNotifications();

    if (!localStorage.getItem('actualChat')) {
      this.alertCtrl.create({message:"Debes seleccionar un chat en la vista táctica de un local!"}).then(a=>{a.present(); setTimeout(()=>{a.dismiss()},3000);});
      this.nav.pop();
    }

    this.actualChat = this.route.snapshot.params.id;

    this.api.getMessages({from_id:this.user.id,to_id:this.actualChat}).subscribe((data:any)=>{
      this.myMessages = data.reverse();
      setTimeout(()=>{
        this.scll();
        this.addOpenFunctionality();
      },100)
      console.log(data);
    })

  	setTimeout(()=>{
  		this.scll();
  	},100)
  }

  ngOnInit() {
  }

  scll()
  {
  	$('#messages').scrollTop(document.getElementById('messages').scrollHeight+100);
  }

  addMessage()
  {
    if (this.text == "") {
      return false;
    }
    let message = {from_id:this.user.id, to_id:this.actualChat, message:this.text, created_at: moment().format('DD-MM-YYYY HH:mm'), user:{name:this.user.name, avatar:this.user.avatar}};
    this.socket.sendMessage(message);

    this.api.saveMessage(message).subscribe(()=>{
      console.log('saved');
    });

  	// this.myMessages.push({id:1,message:this.text});
    document.getElementById('input-chat').focus();
    this.keyboard.show();
  	this.text = "";
  }

  openAction()
  {
    this.action.create({header:"Enviar una imagen",buttons:[
    {
      text: "Tomar una foto",
      icon: "camera",
      handler:()=>{
        this.loadImage(this.camera.PictureSourceType.CAMERA)
      }
    },{
      text: "Seleccionar de la galería",
      icon: "image-outline",
      handler:()=>{
        this.loadImage(this.camera.PictureSourceType.PHOTOLIBRARY)
      }
    }
    ]}).then(a=>{
      a.present();
    });
  }

  loadImage(type)
  {
    const options: CameraOptions = {
      quality: 100,
      sourceType: type,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.api.fixMargin();
     this.uploadToGallery(imageData);

    }, (err) => {
     // Handle error
    });
  }

  uploadToGallery(uri)
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
        params: {user_id:this.user.id},
        headers: {}
    }

    fileTransfer.upload(uri, this.api.url+'/uploadChatImage', options)
     .then((data) => {

        let message = {from_id:this.user.id, to_id:this.actualChat,
          
          message:'<div class="chat-image" style="background-image: url('+JSON.parse(data['response'])[0]+')"></div>',

          created_at: moment().format('DD-MM-YYYY HH:mm'), user:{name:this.user.name, avatar:this.user.avatar}};
        this.socket.sendMessage(message);

        this.api.saveMessage(message).subscribe(()=>{
          console.log('saved');
        });

     }, (err) => {
       // error
     })
  }

  testImage()
  {
    let message = {from_id:this.user.id, to_id:this.actualChat,
          
      message:'<div class="chat-image" style="background-image: url(https://conceptodefinicion.de/wp-content/uploads/2014/05/Imagen-2.jpg)"></div>',

      created_at: moment().format('DD-MM-YYYY HH:mm'), user:{name:this.user.name, avatar:this.user.avatar}};
    this.socket.sendMessage(message);

    this.api.saveMessage(message).subscribe(()=>{
      console.log('saved');
    });
  }

}
