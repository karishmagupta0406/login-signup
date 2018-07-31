import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Vibration } from '@ionic-native/vibration';
import { Storage } from '@ionic/storage';
import { Badge } from '@ionic-native/badge';

import { ReportEmergencyPage } from '../report-emergency/report-emergency';
import { EmergencyContactPage } from '../emergency-contact/emergency-contact';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { NotificationsPage } from '../notifications/notifications';
import { MapPage } from '../map/map';
import { AedlistPage } from '../aedlist/aedlist';
import { MqttServiceProvider } from '../../providers/mqtt-service/mqtt-service';
import { AuthServiceProvider } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-volunteer-home',
  templateUrl: 'volunteer-home.html',
})
export class VolunteerHomePage {

  topicName: string;
  topic: string;
  username: string;
  notificationsQueue: any = [];
  badgeCount: number;
  isMap: boolean;
  obj: any;
  firstName: any;
  isEmergencyAccepted: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private _mqttService: MqttService,
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    private vibration: Vibration,
    private storage: Storage,
    private badge: Badge,
    private alertCtrl: AlertController,
    private acceptEmergencyService: MqttServiceProvider,
    private authService: AuthServiceProvider) {

    this.storage.get('username').then(value => {
      //this.firstName = value.name;
      this.firstName = value;
      //alert(this.firstName);
    });

    this.platform.ready().then(() => {
      this.storage.get('userid').then(value => {
        this.username = value;
        this.topicName = this.username.substring(0, this.username.indexOf("@"));
        // this.topic = '/oneM2M/req/ID-CSE-01:C_'+this.topicName+'/xml';
        //this.topic = '/oneM2M/req/ID-CSE-01/ID-CSE-01:C_' + this.topicName + '/xml';
        this.topic = '/oneM2M/resp/ID-CSE-02:C_' + this.topicName + '/ID-CSE-02/xml';
        console.log("volunteer home page>>>", this.topic);
        this._mqttService.observe(this.topic).subscribe((message: IMqttMessage) => {

          let sensor1 = message.payload.toString();
          let start = sensor1.indexOf("<con>");
          let end = sensor1.indexOf("</con>");
          let res = sensor1.substring(start + 5, end);
          this.obj = JSON.parse(res);
          console.log(`volunteer page data when notification comes`, this.obj);

          if (this.obj.messageType === 'AcceptEmergency') {
            //this.showPopup(this.obj.userDetails.victimId, "300 m| 5 min away");
            let alert = this.alertCtrl.create({
              title: this.obj.userDetails.victimId,
              subTitle: '300 m| 5 min away',
              buttons: [
                {
                  text: 'Accept',
                  handler: () => {
                    console.log('Buy clicked');
                    this.acceptEmergencyService.acceptEmergency(this.obj.userDetails.victimId);
                    this.isEmergencyAccepted = true;
                  }
                },
                {
                  text: 'Decline',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            alert.present();
            this.showNotification('Cardiac arrest alert', this.obj);
            this.notificationsQueue.push(this.obj.userDetails);
            this.vibration.vibrate(2000);
            this.backgroundMode.wakeUp();
            this.badge.increase(1).then(value => {
              this.badgeCount = value;
            })
          } else if (this.obj.messageType === 'GrpNotVolunteerDD' || this.obj.messageType === 'GrpNotVolunteerFA') {
            //this.showPopup(this.obj.userDetails.victimId, this.obj.message);
            let alert = this.alertCtrl.create({
              title: this.obj.userDetails.victimId,
              subTitle: this.obj.message,
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    console.log('show map now');
                    this.showMap();
                  }
                }
              ]
            });
            alert.present();
            console.log("victim details on volunteer page", this.obj.victimDetails);
            console.log("aed details on volunteer page", this.obj.aedDetails);
            this.isMap = true;
            this.showNotification(this.obj.message, this.obj);
            this.backgroundMode.wakeUp();
            this.vibration.vibrate(2000);

          }


          //on click of localnotification in tray

          // this.localNotifications.on("click").subscribe((value) => {
          //   if (this.obj.messageType === 'AcceptEmergency') {

          //     this.showPopup('Cardiac arrest alert', this.obj.userDetails.victimId);

          //   } else if (this.obj.messageType === 'GrpNot') {

          //     this.showPopup('Volunteer1 is with ADE and Volunteer2 with CPR', this.obj.message);
          //   }

          // });

        });
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerHomePage');
  }

  reportEmergency() {
    console.log("Emergency occured!!");
    this.navCtrl.push(ReportEmergencyPage);
  }

  notifications() {
    this.badge.clear().then(() => {
      this.badgeCount = null;
    })
    this.navCtrl.push(NotificationsPage, { notifications: this.notificationsQueue });
    console.log("notifications are here!!");
  }

  personalInfo() {
    console.log("personal infomation page");
    this.navCtrl.push(PersonalInfoPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          // handler: data => {
          // }
        }
      ]
    });
    alert.present();
  }

  showNotification(title, notificationData) {
    let notification = {
      title: title,
      trigger: { at: new Date(new Date().getTime() + 10000) },
      data: notificationData.userDetails
    };
    this.localNotifications.schedule(notification);
  }

  showMap() {
    console.log("click on navigate button", JSON.stringify(this.obj));
    this.navCtrl.push(MapPage, { data: this.obj });
  }

  getAedList() {
    this.navCtrl.push(AedlistPage);
  }

  lifeSaved() {
    let victimId = this.obj.userDetails.victimId;
    console.log("volunteer ID", this.username);
    console.log("victim ID", victimId);
    this.authService.lifeSaved(this.username, victimId).subscribe(data => {
      console.log("help done clicked now disable button");
      this.isEmergencyAccepted = false;
    },
      error => {
        console.log("Error", error);
      });
  }
}
