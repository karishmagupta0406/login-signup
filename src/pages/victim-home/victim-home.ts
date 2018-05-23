import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportEmergencyPage } from '../report-emergency/report-emergency';
import { EmergencyContactPage } from '../emergency-contact/emergency-contact';
import { MedicalHistoryPage } from '../medical-history/medical-history';
import { PersonalInfoPage } from '../personal-info/personal-info';

/**
 * Generated class for the VictimHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-victim-home',
  templateUrl: 'victim-home.html',
})
export class VictimHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VictimHomePage');
  }
  reportEmergency(){
    console.log("Emergency occured!!");
    this.navCtrl.push(ReportEmergencyPage);
  }

  emergencyContact(){
    console.log("navigate to emergency contact page");
    this.navCtrl.push(EmergencyContactPage);
  }

  medicalHistory(){
    console.log("navigate to Medical History page");
    this.navCtrl.push(MedicalHistoryPage);
  }

  personalInfo(){
    console.log("navigating to personal information page");
    this.navCtrl.push(PersonalInfoPage);
  }

}
