import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { FavoritePage } from '../pages/favorite/favorite';
import { ChatPage } from '../pages/chat/chat';
import { CameraPage } from '../pages/camera/camera';
import { QrReaderPage } from '../pages/qr-reader/qr-reader';
import { ApiProvider } from '../providers/api/api';

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
  logged: boolean;
  name: string;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public apiProvider: ApiProvider
  ) {
    this.initializeApp();

    this.storage.get('logged').then((val) => {
      console.log('Logged : '+val);
      if (val !== true) {
        console.log('No session defined '+val);
        this.logged = false;
        this.name = '';
        this.pages = [
          { title: 'Homepage', component: HelloIonicPage },
          { title: 'Films', component: ListPage },
          { title: 'Login', component: LoginPage },
          { title: 'Photos', component: CameraPage },
          { title: 'QR Reader', component: QrReaderPage }
        ];
      } else {
        this.storage.get('name').then((value) => {
          this.name = value;
          this.logged = true;
          console.log(this.name+' '+this.logged);
          if (this.logged === true) {
            this.pages = [
              { title: 'Homepage', component: HelloIonicPage },
              { title: 'Films', component: ListPage },
              { title: 'Favorites', component: FavoritePage },
              { title: 'Chat', component: ChatPage },
              { title: 'Photos', component: CameraPage },
              { title: 'QR Reader', component: QrReaderPage }
            ];
          } 
          //this.isLogged(this.name);
        });
      }
    })
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
    /*this.storage.remove('name').then((val) => {
      console.log('Session is now '+val);
    });*/
    this.storage.clear();
    window.location.reload();
    this.apiProvider.logout();
  }
}
