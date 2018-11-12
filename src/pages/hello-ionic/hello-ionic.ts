import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  	private storage: Storage) {

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
  }
}
