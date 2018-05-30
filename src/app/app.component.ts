import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';


import { WelcomePage } from '../pages/welcome/welcome';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';
import { MedicalHistoryPage } from '../pages/medical-history/medical-history';
import { ReportEmergencyPage } from '../pages/report-emergency/report-emergency';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  sensor1: string;
  //once victim page completed uncomment this
    //rootPage:any = WelcomePage;
 
  @ViewChild(Nav) nav;
  //rootPage:any = WelcomePage; 

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              private storage: Storage,
              private vibration: Vibration,
              private _mqttService: MqttService,
              private fcm : FCM,
              private localNotifications: LocalNotifications) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

    this.storage.get('isLogged').then(logged => {
      if (logged) {
        this.storage.get('userType').then(value =>{
          if(value.toLowerCase() === 'victim'){
            this.nav.setRoot(VictimHomePage);
          } else{
            this.nav.setRoot(VolunteerHomePage);
          }
        });
      } else {
        this.nav.setRoot(NotificationsPage);
      }
    });
    
    // MQTT and local notifications implementation
    // this._mqttService.observe('komal/1').subscribe((message: IMqttMessage) =>{
    //   this.sensor1 = message.payload.toString();
    //   console.log("test test",this.sensor1);
    //   alert("hello");
    //   this.localNotifications.schedule({
    //     id: 1,
    //     text: 'Medical emergency',
    //     sound: 'file://sound.mp3',
    //     data: { message : this.sensor1 },
    //     lockscreen: true
    //   });
      
    // });
    // this.fcm.subscribeToTopic('all');

    // this.fcm.subscribeToTopic('Victim');

    // this.fcm.getToken().then(token => {
    // // backend.registerToken(token);
    // alert(token);
    // console.log(token);
    // this.storage.set('token', token);
    // });


    this.fcm.onNotification().subscribe(data => {
      alert('message received');
      console.log(data);
      if(data.wasTapped) {
        console.info("Received in background");
      } else {
        console.info("Received in foreground");
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      // backend.registerToken(token);
    });

  });
}
}
