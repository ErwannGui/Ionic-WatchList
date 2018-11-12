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
		      this.storage.set('name', data['firstname']);
		    });
		  }
	  });

	  this.geolocation.getCurrentPosition().then(res => {
		 res.coords.latitude;
		 res.coords.longitude;
		}).catch(error => {
		  console.log('Error getting location', error);
		});

		/*let watch = this.geolocation.watchPosition();
		watch.subscribe(data => {
		 // data can be a set of coordinates, or an error (if an error occurred).
		 // data.coords.latitude
		 // data.coords.longitude
		  console.log(data.coords.longitude + ' ' + data.coords.latitude);
		});*/
  }
}
