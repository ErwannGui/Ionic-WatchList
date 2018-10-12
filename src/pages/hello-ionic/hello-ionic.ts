import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

	name: string;

  constructor(private storage: Storage) {
  	this.storage.get('name').then(val => {
	    console.log('Hello ', val);
	    this.name = val;
	  });
  }
}
