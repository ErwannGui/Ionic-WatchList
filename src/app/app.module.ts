import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
/*import { BarcodeScanner } from '@ionic-native/barcode-scanner';*/
import { AES256 } from '@ionic-native/aes-256';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MyApp } from './app.component';

import { ConsoleLoggerService } from '../services/logger/console-logger.service';
import { LoggerService } from '../services/logger/logger.service';
import { LoginPage } from '../pages/login/login';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { FavoritePage } from '../pages/favorite/favorite';
import { ChatPage } from '../pages/chat/chat';
import { CameraPage } from '../pages/camera/camera';
/*import { QrReaderPage } from '../pages/qr-reader/qr-reader';*/
import { ExpandableComponent } from '../components/expandable/expandable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { DataProvider } from '../providers/data/data';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { CryptoProvider } from '../providers/crypto/crypto';
var config: SocketIoConfig = { url: 'https://api-ionic-watchlist.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SubscriptionPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    FavoritePage,
    ChatPage,
    CameraPage,
    /*QrReaderPage,*/
    ExpandableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SubscriptionPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    FavoritePage,
    ChatPage,
    CameraPage,
    /*QrReaderPage*/
  ],
  providers: [
    StatusBar,
    SplashScreen, Camera,/* BarcodeScanner,*/ AES256, GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    ApiProvider,
    DataProvider,
    CryptoProvider,
    Geolocation,
  ],
  exports: [ExpandableComponent]
})
export class AppModule {}
