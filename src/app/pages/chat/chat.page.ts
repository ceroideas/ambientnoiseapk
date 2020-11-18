import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { EventsService } from '../../services/events.service';
import { ApiService } from '../../services/api.service';
import * as $ from 'jquery';
import * as moment from 'moment';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [FileTransfer,Camera]
})
export class ChatPage implements OnInit {

  @ViewChild('messages') private messages: any;

  // tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;

  user = JSON.parse(localStorage.getItem('ANuser'));

  myMessages = [
  	
  ];

  actualChat;

  text = "";

  constructor(public nav: NavController, public socket: SocketService, public events: EventsService, public alertCtrl: AlertController, public api: ApiService, public action: ActionSheetController,
    private camera: Camera, private transfer: FileTransfer, public toast: ToastController, public route: ActivatedRoute) {

    this.events.destroy('addNewMessage');
    this.events.subscribe('addNewMessage',(data:any)=>{
      if (this.actualChat == data.to_id || this.actualChat == data.from_id) {
        this.myMessages.push(data);
        setTimeout(()=>{
          $('#messages').scrollTop(document.getElementById('messages').scrollHeight+100);
        },100)
      }
    })
  }

  ionViewDidEnter()
  {

    if (!localStorage.getItem('actualChat')) {
      this.alertCtrl.create({message:"Debes seleccionar un chat en la vista táctica de un local!"}).then(a=>a.present());
      this.nav.back();
    }

    this.actualChat = this.route.snapshot.params.id;

    this.api.getMessages({from_id:this.user.id,to_id:this.actualChat}).subscribe((data:any)=>{
      this.myMessages = data.reverse();
      setTimeout(()=>{
        this.scll();
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
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):

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

}
