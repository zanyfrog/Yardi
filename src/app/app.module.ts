import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { ApiService, AuthService, GuestCardInterfaceService } from '../services/services';

import { AboutPage, ContactPage, HomePage, PropertiesPage, SettingsPage, TabsPage } from '../pages/pages';
import { PropertyInformationComponent
	//, TestComponent 
	, PropertyIlsUnitComponent
} from '../components/components';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
	 HomePage,
	 PropertiesPage,
    SettingsPage,
	 TabsPage,
	 PropertyInformationComponent//, TestComponent
	 , PropertyIlsUnitComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
	 IonicStorageModule.forRoot(),
	 
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
	 ContactPage,
	 PropertiesPage,
    SettingsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    ApiService,
	 AuthService,
	 GuestCardInterfaceService, 
   
    //StatusBar,
    //SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
