import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth.service';


/**
 * Generated class for the ReportEmergencyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-emergency',
  templateUrl: 'report-emergency.html',
})
export class ReportEmergencyPage {

  constructor(
              //private navCtrl: NavController, 
              //private navParams: NavParams,
              //private geolocation: Geolocation,
              private auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEmergencyPage');
  }

  emergencyAlert(){

    //To get current location

    
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //   console.log(data.coords.latitude);
    //   console.log(data.coords.longitude);
    //  });

    this.auth.emergencyAlert().subscribe(success => {
      if (success) {
        alert("save me!");
      }
    });
          
    console.log('hurry up!!');
  }
}
