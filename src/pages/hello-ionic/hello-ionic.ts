import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

	name: string;
	token: string;

  constructor(
  	public apiProvider: ApiProvider,
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

	  this.geolocation.getCurrentPosition().then(res => {
		 console.log(res.coords.latitude);
		 console.log(res.coords.longitude);
		}).catch(error => {
		  console.log('Error getting location', error);
		});
  }
}
