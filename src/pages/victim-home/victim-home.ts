import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportEmergencyPage } from '../report-emergency/report-emergency';
import { EmergencyContactPage } from '../emergency-contact/emergency-contact';
import { MedicalHistoryPage } from '../medical-history/medical-history';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';

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

  topicName: string;
  topic: string;
  username: string;
  notificationsQueue: any = [];
  firstName: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _mqttService: MqttService,
    private localNotifications: LocalNotifications,
    private storage: Storage) {
    this.storage.get('username').then(value => {
      this.firstName = value;
      console.log(this.firstName);  
    });

    this.storage.get('userid').then(value => {
      this.username = value;
      console.log("when user accept emergency, loggedIn user", this.username);
      this.topicName = this.username.substring(0, this.username.indexOf("@"));
      //this.topic = '/oneM2M/req/ID-CSE-01:C_' + this.topicName + '_AE/ID-CSE-01/xml';
      this.topic = '/oneM2M/resp/ID-CSE-02:C_' + this.topicName + '/ID-CSE-02/xml';
      this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {

        let sensor1 = message.payload.toString();
        let start = sensor1.indexOf("<con>");
        let end = sensor1.indexOf("</con>");
        let res = sensor1.substring(start + 5, end);
        let obj = JSON.parse(res);

        console.log('notification message', obj.messageType);
        //alert(obj.messageType);
        this.notificationsQueue.push(obj.userDetails);
        alert(this.notificationsQueue.length);

        this.localNotifications.schedule({
          title: obj.messageType,
          id: Math.random(),
          text: 'Medical emergency Alert',
          trigger: { at: new Date(new Date().getTime()) },
          data: obj.userDetails
        });

        // this.localNotifications.on("click").subscribe((value) =>{
        //   this.navCtrl.push(NotificationsPage,{notifications: this.notificationsQueue});
        // });

      });
    });

    //this.username =  `komal.chhabra@test.com`;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VictimHomePage');
  }
  reportEmergency() {
    console.log("Emergency occured!!");
    this.navCtrl.push(ReportEmergencyPage);
  }

  emergencyContact() {
    console.log("navigate to emergency contact page");
    this.navCtrl.push(EmergencyContactPage);
  }

  medicalHistory() {
    console.log("navigate to Medical History page");
    this.navCtrl.push(MedicalHistoryPage);
  }

  personalInfo() {
    console.log("navigating to personal information page");
    this.navCtrl.push(PersonalInfoPage);
  }

}
