import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { MqttService } from 'ngx-mqtt';

@Injectable()
export class MqttServiceProvider {
  topic: string = `/oneM2M/req/ID-CSE-01:C_RogersERX/ID-CSE-01/xml`;

	userdetails = { lat: 0, lng: 0, userid: '', victimId: '' };
	alertDetails = {
		messageType: "emergencyAccepted",
		userDetails: this.userdetails
	}
  message: string;


  constructor(private storage: Storage, private geolocation: Geolocation, private _mqttService: MqttService) {
    console.log('Hello MqttServiceProvider Provider');
    this.storage.get('userid').then(value => {
			this.userdetails.userid = value;
			console.log("when user accept emergency, loggedIn user", this.userdetails.userid);
    });
    
    this.geolocation.getCurrentPosition().then((resp) => {
			this.userdetails.lat = resp.coords.latitude;
			this.userdetails.lng = resp.coords.longitude;
		}).catch((error) => {
			console.log('Error getting location', error);
		});
  }

  acceptEmergency(victimId){
    this.userdetails.victimId = victimId;
		console.log("emergency alert for victim",this.userdetails.victimId);
		this.message = `<m2m:rqp xmlns:m2m="http://www.onem2m.org/xml/protocols"><op>1</op><to>oneMPOWER-IN-CSE/RogersERX/common</to><fr>C_RogersERX</fr><rqi>m_crtae152567755568</rqi><ty>4</ty><pc><m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols"><cnf>application/json</cnf><con>${JSON.stringify(this.alertDetails)}</con></m2m:cin></pc></m2m:rqp>`;
		console.log(`when user accept emergency >>>user details`, JSON.stringify(this.userdetails));
		console.log('<<<<<<<<<<publish on topic for accept alert>>>>>>>', this.message);
		this.unsafePublish(this.topic, this.message);
  }

  public unsafePublish(topic: string, message: string): void {
		this._mqttService.unsafePublish(topic, message, { qos: 1, retain: false });
		//this._mqttService.publish(topic,message, {qos: 1, retain: true});
	}

}
