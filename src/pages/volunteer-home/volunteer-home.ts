import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportEmergencyPage } from '../report-emergency/report-emergency';
import { EmergencyContactPage } from '../emergency-contact/emergency-contact';
import { PersonalInfoPage } from '../personal-info/personal-info';

/**
 * Generated class for the VolunteerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-home',
  templateUrl: 'volunteer-home.html',
})
export class VolunteerHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerHomePage');
  }

  reportEmergency(){
    console.log("Emergency occured!!");
    this.navCtrl.push(ReportEmergencyPage);
  }

  notifications(){
    console.log("notifications are here!!");
  }

  personalInfo(){
    console.log("personal infomation page");
    this.navCtrl.push(PersonalInfoPage);
  }

}
