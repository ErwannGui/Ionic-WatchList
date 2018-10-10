import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyApp } from '../../app/app.component';

import { LoggerService } from '../../services/logger/logger.service';
import { ApiProvider } from '../../providers/api/api';
import { HelloIonicPage } from '../../pages/hello-ionic/hello-ionic';

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
              private logger: LoggerService) {

    this.credentialsForm = this.formBuilder.group({
	    email: [''],
      password: ['']
    });
  }

  onLogin() {
    if (this.credentialsForm.valid) {
      this.logger.info('Email: ' +
        this.credentialsForm.controls['email'].value);
      this.logger.info('Password: ' +
        this.credentialsForm.controls['password'].value);
      this.redirectToRoot();
    }
  }

  onForgotPassword() {
    this.logger.info('LoginPage: onForgotPassword()');
  }

  redirectToRoot() {
    this.navCtrl.setRoot(HelloIonicPage);
    this.navCtrl.popToRoot();
  }

}