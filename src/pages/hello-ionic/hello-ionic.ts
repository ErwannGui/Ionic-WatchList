import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiProvider } from '../../providers/api/api';
import { CryptoProvider } from '../../providers/crypto/crypto';

import { Platform } from 'ionic-angular/index';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

	name: string;
	token: string;
	data: string;
	encryptedData: string;
	decryptedData: string;

  constructor(
  	public apiProvider: ApiProvider,
  	public cryptoProvider: CryptoProvider,
  	private platform: Platform,
  	private storage: Storage,
  	private geolocation: Geolocation) {

	  this.storage.get('token').then(data => {
	    this.token = data;

	    if(this.token != undefined){
		  	console.log(this.token);
			  this.apiProvider.profile(this.token)
			  .then(data => {
			  	console.log(data);
			  	this.name = data['firstname'];
		      this.storage.set('username', data['email'].substring(0, data['email'].lastIndexOf("@")));
		    });
		  }
	  });

	  if (this.platform.is('cordova')) {
    	this.cryptoProvider.generateSecureKeyAndIV();
    	this.data = "hello world";
      this.encryptedData = this.cryptoProvider.encrypt(this.data);
      this.decryptedData = this.cryptoProvider.decrypt(this.encryptedData);
    }

	  this.geolocation.getCurrentPosition().then(res => {
		 console.log(res.coords.latitude);
		 console.log(res.coords.longitude);
		}).catch(error => {
		  console.log('Error getting location', error);
		});
  }
}
