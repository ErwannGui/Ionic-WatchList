import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages = [];
  nickname = '';
  message = '';
  target = '';
  rooms = [];

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private socket: Socket,
  	private storage: Storage,
  	private toastCtrl: ToastController) {

  	this.rooms = ['global'];

  	this.storage.get('username').then(data => {
  		this.nickname = data;
    	this.socket.emit('set-nickname', this.nickname);
  	});
 
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getPrivateMsg().subscribe(message => {
    	if (message['target'] == this.nickname || message['from'] == this.nickname) {
      	this.messages.push(message);
      }
    });
 
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  joinRoom() {
    var room = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
		  room += possible.charAt(Math.floor(Math.random() * possible.length));

		this.socket.emit('room', room);
		this.rooms.push(room);
  }
 
  sendMessage() {
  	if (this.target !== ''){
  		this.socket.emit('private-message',{ target: this.target, text: this.message });
  	} else this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getPrivateMsg() {
  	let observable = new Observable(observer => {
      this.socket.on('private', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
  	this.socket.connect();
    console.log('ionViewDidLoad ChatPage');
  }

}


@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Music" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Movies" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="Games" [root]="rootPage"></ion-tab>
    </ion-tabs>
`})
export class BasicPage {
  rootPage = TabBasicContentPage;
}
