import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth.service';
import { MqttService } from 'ngx-mqtt';


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
 
  userdetails = { lat: 0, lng: 0, userid: 'karishma.gupta@test.com' };
  alertDetails = {
    messageType:"emergencyAlert",
    userdetails: this.userdetails
}
  topic: string = '/oneM2M/req/ID-CSE-01:C_ERX/ID-CSE-01/xml';
  message: string;
 

  constructor(
              private geolocation: Geolocation,
              private auth: AuthServiceProvider,
              private _mqttService: MqttService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportEmergencyPage');
  }

  emergencyAlert(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userdetails.lat = resp.coords.latitude;
      this.userdetails.lng = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     this.message = `<m2m:rqp xmlns:m2m="http://www.onem2m.org/xml/protocols"><op>1</op><to>oneMPOWER-IN-CSE/ERXAE/common</to><fr>C_ERX</fr><rqi>m_crtae152567755568</rqi><ty>4</ty><pc><m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols"><cnf>application/json</cnf><con>${JSON.stringify(this.alertDetails)}</con></m2m:cin></pc></m2m:rqp>`;
     console.log(`user details`, JSON.stringify(this.userdetails));
     this.unsafePublish(this.topic,JSON.stringify(this.message));
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

}
