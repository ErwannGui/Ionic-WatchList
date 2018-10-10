import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { LoggerService } from '../services/logger/logger.service';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make LoginPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  const logged: boolean;
  const name: string;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage
  ) {
    this.initializeApp();

    this.storage.get('logged').then((val) => {
      if (val !== true) {
        console.log('No session defined '+val);
        this.logged = false;
        this.name = '';
      } else {
        this.storage.get('name').then((value) => {
          this.name = value;
          this.logged = true;
          console.log(this.name+' '+this.logged);
          //this.isLogged(this.name);
        });
      }
    })

    if (this.logged === true) {
      this.pages = [
        { title: 'Hello Ionic', component: HelloIonicPage },
        { title: 'My First List', component: ListPage }
      ];
    } else {
      console.log(this.logged);
    // set our app's pages
      this.pages = [
        { title: 'Hello Ionic', component: HelloIonicPage },
        { title: 'My First List', component: ListPage },
        { title: 'Login', component: LoginPage }
      ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  isLogged(name: string) {
    if (name === 'Erwann') {
      this.logged = true;
      console.log(name+' is logged ? '+this.logged);
    }
    return this.logged;
  }

  doLogout() {
    this.storage.remove('name').then((val) => {
      console.log('Session is now '+val);
    });
    this.storage.set('logged', false);
  }
}
