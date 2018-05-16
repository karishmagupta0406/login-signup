import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { VictimHomePage } from '../pages/victim-home/victim-home';
import { VolunteerHomePage } from '../pages/volunteer-home/volunteer-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //once victim page completed uncomment this
    rootPage:any = WelcomePage;
  //rootPage:any = VictimHomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
