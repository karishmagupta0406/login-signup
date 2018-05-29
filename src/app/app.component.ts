import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';

import { WelcomePage } from '../pages/welcome/welcome';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';
import { MedicalHistoryPage } from '../pages/medical-history/medical-history';
import { ReportEmergencyPage } from '../pages/report-emergency/report-emergency';
import { LoginPage } from '../pages/login/login';

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
              private _mqttService: MqttService) {

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
           this.nav.setRoot(LoginPage);
        }
        
      });

      this._mqttService.observe('komal/1').subscribe((message: IMqttMessage) => 
   {
   this.sensor1 = message.payload.toString();
   console.log("test test",this.sensor1);
   });
      
    });
  }
}
