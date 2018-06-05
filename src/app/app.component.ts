import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FCM } from '@ionic-native/fcm';
import * as firebase from 'firebase';

import { WelcomePage } from '../pages/welcome/welcome';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';
import { MedicalHistoryPage } from '../pages/medical-history/medical-history';
import { ReportEmergencyPage } from '../pages/report-emergency/report-emergency';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MapPage } from '../pages/map/map';

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
  topic : string;
  topicName: string;
  //once victim page completed uncomment this
    //rootPage:any = WelcomePage;
 
  @ViewChild(Nav) nav;
  //rootPage:any = WelcomePage; 
  notifications: any = [];

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
      this.localNotifications.on("click").subscribe((value) =>{
        console.log(value.data);
        this.notifications.push(value.data);
        alert(JSON.stringify(value));
      });
      
      this.storage.get('isLogged').then(logged => {

      if (logged) {
        this.storage.get('userType').then(value =>{
          if(value.toLowerCase() === 'victim'){
            this.nav.setRoot(VictimHomePage);
          } else{
            this.nav.setRoot(VolunteerHomePage);
          }
        });

        this.storage.get('username').then(value =>{
          this.username = value;
          this.topicName = this.username.substring(0,this.username.indexOf("@"));
          alert(this.topicName);
        });

      } else {

        this.nav.setRoot(NotificationsPage);
        this.username =  `karishma.gupta@test.com`;
        this.topicName = this.username.substring(0,this.username.indexOf("@"));
        this.topic = '/oneM2M/req/ID-CSE-01:C_karishma.gupta_AE/ID-CSE-01/xml';
        this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) =>{
        this.sensor1 = message.payload.toString();
        var start = this.sensor1.indexOf("<con>");
        var end = this.sensor1.indexOf("</con>");
        var res = this.sensor1.substring(start+5, end);
        this.obj = JSON.parse(res);
        console.log(this.obj);
            this.localNotifications.schedule({
              title: "roger's",
              id: Math.random(),
              text: 'Medical emergency',
              trigger: {at: new Date(new Date().getTime())},
              data: {"id" :1, "victim": "amandeep.xyz@gmail.com"}
            });
         });
        }
      });
    
    // MQTT and local notifications implementation
    // this.topic = '/oneM2M/req/ID-CSE-01:C_komal.chhabra_AE/ID-CSE-01/xml'
    // this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) =>{
    //   this.sensor1 = message.payload.toString();
    //   console.log("test test",this.sensor1);
    //   alert(this.sensor1);
    //   var start = this.sensor1.indexOf("<con>");
    //   var end = this.sensor1.indexOf("</con>");
    //   var res = this.sensor1.substring(start+5, end);
    //   this.obj = JSON.parse(res);
    //   alert(this.obj.userDetails.userid);
    //   this.localNotifications.schedule({
    //     id: Math.random(),
    //     text: 'Medical emergency',
    //     sound: 'file://sound.mp3',
    //     icon: 'file://src/assets/imgs/device.png',
    //     data: { message : this.obj }      
    //   });
      
    // });

  });
  firebase.initializeApp(config);
}
}
