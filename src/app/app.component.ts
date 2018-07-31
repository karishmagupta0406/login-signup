import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
// import { Vibration } from '@ionic-native/vibration';
// import { MqttService } from 'ngx-mqtt';
// import { LocalNotifications } from '@ionic-native/local-notifications';
// import { FCM } from '@ionic-native/fcm';
import * as firebase from 'firebase';

import { WelcomePage } from '../pages/welcome/welcome';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';
import { MapPage } from '../pages/map/map';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AedlistPage } from '../pages/aedlist/aedlist';
// import { MedicalHistoryPage } from '../pages/medical-history/medical-history';
// import { ReportEmergencyPage } from '../pages/report-emergency/report-emergency';
// import { LoginPage } from '../pages/login/login';
// import { NotificationsPage } from '../pages/notifications/notifications';
// import { MapPage } from '../pages/map/map';
// import { SignupPage } from '../pages/signup/signup';

const config = {
  apiKey: 'AIzaSyCTd_CiE0pIsOyZ1Q1uy4WKckWtkQ5vccs',
  authDomain: 'rogers-erx.firebaseapp.com',
  databaseURL: 'https://rogers-erx.firebaseio.com/',
  projectId: 'rogers-erx',
  storageBucket: 'gs://rogers-erx.appspot.com',
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  username: any;
  obj: any;
  sensor1: string;
  topic: string;
  topicName: string;
  //once victim page completed uncomment this
  //rootPage:any = WelcomePage;

  @ViewChild(Nav) nav;
  //rootPage:any = WelcomePage; 
  notifications: any = [];

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      // this.localNotifications.on("click").subscribe((value) =>{
      //   console.log(value.data);
      //   this.notifications.push(value.data);
      //   alert(JSON.stringify(value));
      // });

      this.storage.get('isLogged').then(logged => {
        console.log("user is logging>>", logged);
        if (logged) {
          this.storage.get('userType').then(value => {
            if (value.toLowerCase() === 'victim') {
              this.nav.setRoot(VictimHomePage);
            } else {
              this.nav.setRoot(VolunteerHomePage);
            }
          })
        } else {
          this.nav.setRoot(WelcomePage);
        }
      });
    });
    firebase.initializeApp(config);
  }
}
