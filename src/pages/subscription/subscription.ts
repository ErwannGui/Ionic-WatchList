import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {

	credentialsForm: FormGroup;
	error: boolean;

  constructor(
  	public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public apiProvider: ApiProvider,
  	public navParams: NavParams) {

  	this.credentialsForm = this.formBuilder.group({
  		firstname: [''],
  		lastname: [''],
	    email: [''],
      password: [''],
      confirmPassword: ['']
    });
    this.error = false;
  }

  onFormValidate() {
  	if (this.credentialsForm.valid) {
  		let firstname: string = this.credentialsForm.controls['firstname'].value;
  		let lastname: string = this.credentialsForm.controls['lastname'].value;
      let email: string = this.credentialsForm.controls['email'].value;
      let password: string = this.credentialsForm.controls['password'].value;
      let confirm: string = this.credentialsForm.controls['confirmPassword'].value;
      let nbUsers: number = 0;
      if (password != confirm) {
      	this.error = true;
      	console.log('Passwords don\'t match');
      	this.refresh();
      }
      this.apiProvider.getUsers()
	    .then(data => {
	    	nbUsers = data.length;
	      let newUser: User = {
		  		"id": nbUsers+1,
		  		"firstname": firstname,
		  		"lastname": lastname,
		  		"email": email,
		  		"password": password
		  	};
		  	console.log(newUser);
		  	this.apiProvider.createUser(newUser)
		  	.then(data => {
		  		if (data.email == newUser.email) {
	    			this.redirectToRoot();
		  		} else console.log(data);
		  	});
	    });
    }
  }

  redirectToRoot() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  refresh() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(SubscriptionPage);
  }

}
