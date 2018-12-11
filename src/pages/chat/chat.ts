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
  clients = [];
  expanded: boolean;
  itemExpandHeight: number;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private socket: Socket,
  	private storage: Storage,
  	private toastCtrl: ToastController) {

  	this.expanded = false;
  	this.itemExpandHeight = 100;

  	this.rooms = ['global'];

  	this.storage.get('name').then(data => {
  		this.nickname = data;
    	this.socket.emit('set-nickname', this.nickname);
  	});

  	this.getAllClients().subscribe(clientlist => {
  		for (var i = 0; i < Object.keys(clientlist).length; i++) {
  			var index = this.clients.indexOf(clientlist[i]);
      	if (index > -1) {
				  this.clients.push(clientlist[i]);
				}
  		}
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
      	let index = this.clients.indexOf(user);
      	if (index > -1) {
				  this.clients.splice(index, 1);
				}
        this.showToast('User left: ' + user);
      } else {
      	let index = this.clients.indexOf(user);
      	if (index > -1) {
				  this.clients.splice(index, 1);
				}
        this.showToast('User joined: ' + user);
      }
    });
  }

  getAllClients() {
  	let observable = new Observable(observer => {
      this.socket.on('clients', (data) => {
        observer.next(data);
      });
    });
    return observable;
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
  		this.socket.emit('add-private-message',{ target: this.target, text: this.message });
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
      this.socket.on('private-message', (data) => {
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

  expandItem(){
    this.expanded = !this.expanded;
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


/*@Component({
  templateUrl: `
	  <ion-tabs selectedIndex="1" color="primary" style="margin-top: 48px!important;">
	    <ion-tab tabTitle="Global" [root]="global" tabBadge="0"></ion-tab>
	    <ion-tab *ngFor="let room of rooms" tabTitle="{{ room }}" [root]="{{ room }}" [tabBadge]="0"></ion-tab>
		</ion-tabs>
`})
export class TabsPage {

  global = ChatPage;

  rooms = ['global'];

  constructor() {

  }
}*/