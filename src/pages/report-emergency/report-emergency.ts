import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


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

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEmergencyPage');
  }

  emergencyAlert(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
     });
          
    console.log('hurry up!!');
  }
}
