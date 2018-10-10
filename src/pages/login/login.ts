import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiProvider } from '../../providers/api/api';
import { HelloIonicPage } from '../../pages/hello-ionic/hello-ionic';

import { Storage } from '@ionic/storage';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public apiProvider: ApiProvider,
              private storage: Storage) {

    this.credentialsForm = this.formBuilder.group({
	    email: [''],
      password: ['']
    });
  }

  onLogin() {
    if (this.credentialsForm.valid) {
      let email: string = this.credentialsForm.controls['email'].value;
      let password: string = this.credentialsForm.controls['password'].value;
      this.getUsers(email, password)
    }
  }

  getUsers(email: string, password: string) {
    this.apiProvider.getUsers()
    .then(data => {
      for(let i = 0; i < data.length; i++) {
        if (data[i].email == email && data[i].password == password) {
          console.log(data[i]);
          this.storage.set('name', data[i].firstname);
          //storage.set('lastname', data[i].lastname);
          //storage.set('email', data[i].email);
          //this.setItems();
          //console.log(this.comments);
        }
      }
      this.redirectToRoot();
      //this.setItems();
      //console.log(this.films);
    });
  }

  onForgotPassword() {
    //this.logger.info('LoginPage: onForgotPassword()');
    this.redirectToRoot();
  }

  redirectToRoot() {
    this.navCtrl.setRoot(HelloIonicPage);
    this.navCtrl.popToRoot();
  }

}