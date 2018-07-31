import { Component, Input, AfterViewInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MqttService } from 'ngx-mqtt';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-report-emergency',
  templateUrl: 'report-emergency.html',
})
export class ReportEmergencyPage {


  userdetails = { lat: 0, lng: 0, userid: '' };
  alertDetails = {
    messageType: "emergencyAlert",
    userDetails: this.userdetails
  }
  topic: string = '/oneM2M/req/ID-CSE-01:C_RogersERX/ID-CSE-01/xml';
  message: string;


  constructor(
    private geolocation: Geolocation,
    private _mqttService: MqttService,
    private storage: Storage,
    public navCtrl: NavController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEmergencyPage');
  }

  emergencyAlert() {
    this.storage.get('userid').then(value => {
      this.userdetails.userid = value;
      //console.log("report emergency page, loggedIn user",this.userdetails.userid);
    });

    //console.log(JSON.stringify(this.alertDetails));
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userdetails.lat = resp.coords.latitude;
      this.userdetails.lng = resp.coords.longitude;
      this.message = `<m2m:rqp xmlns:m2m="http://www.onem2m.org/xml/protocols"><op>1</op><to>oneMPOWER-IN-CSE/RogersERX/common</to><fr>C_RogersERX</fr><rqi>m_crtae152567755568</rqi><ty>4</ty><pc><m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols"><cnf>application/json</cnf><con>${JSON.stringify(this.alertDetails)}</con></m2m:cin></pc></m2m:rqp>`;
      //console.log(`report emergency page, >>>user details`, JSON.stringify(this.userdetails));
      console.log(`mqtt message format`, this.message);
      this.unsafePublish(this.topic, this.message);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: false });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
