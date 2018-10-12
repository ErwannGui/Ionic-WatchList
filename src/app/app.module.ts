import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ConsoleLoggerService } from '../services/logger/console-logger.service';
import { LoggerService } from '../services/logger/logger.service';
import { LoginPage } from '../pages/login/login';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { FavoritePage } from '../pages/favorite/favorite';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SubscriptionPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    FavoritePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SubscriptionPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    FavoritePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    ApiProvider,
    DataProvider
  ]
})
export class AppModule {}
