
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
// import { } from 'ionic-na';
import { FCM } from '@ionic-native/fcm';
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Device } from '@ionic-native/device';
import { BackgroundMode } from '@ionic-native/background-mode';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';
import { ReportEmergencyPage } from '../pages/report-emergency/report-emergency';
import { EmergencyContactPage } from '../pages/emergency-contact/emergency-contact';
import { MedicalHistoryPage } from '../pages/medical-history/medical-history';
import { PersonalInfoPage } from '../pages/personal-info/personal-info';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MapPage } from '../pages/map/map';
import { AedlistPage } from '../pages/aedlist/aedlist'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth.service';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { MqttModule, MqttService } from 'ngx-mqtt';
import { Badge } from '@ionic-native/badge';
import { UtiliesProvider } from '../providers/Utilies';
import { MqttServiceProvider } from '../providers/mqtt-service/mqtt-service';

export const MQTT_SERVICE_OPTIONS = {
  hostname: '10.97.47.10',
  port: 9001,
  path: '/mqtt'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    VictimHomePage,
    VolunteerHomePage,
    ReportEmergencyPage,
    EmergencyContactPage,
    MedicalHistoryPage,
    PersonalInfoPage,
    NotificationsPage,
    MapPage,
    AedlistPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    WelcomePage,
    VictimHomePage,
    VolunteerHomePage,
    ReportEmergencyPage,
    EmergencyContactPage,
    MedicalHistoryPage,
    PersonalInfoPage,
    NotificationsPage,
    MapPage,
    AedlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    Geolocation,
    Storage,
    AuthServiceProvider,
    Vibration,
    Device,
    BackgroundMode,
    LocalNotifications,
    Badge,
    UtiliesProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MqttServiceProvider
  ]
})
export class AppModule { }
