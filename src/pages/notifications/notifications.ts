import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { MqttService } from 'ngx-mqtt';
import { MqttServiceProvider } from '../../providers/mqtt-service/mqtt-service'


/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-notifications',
	templateUrl: 'notifications.html',
})
export class NotificationsPage {
	message: string;
	map: any;
	infoWindow: any;
	notifications: any = [];
	public archievedTodos = [];
	// topic: string = `/oneM2M/req/ID-CSE-01:C_ERX/ID-CSE-01/xml`;

	// userdetails = { lat: 0, lng: 0, userid: 'karishma.jain@gmail.com', victimId: '' };
	// alertDetails = {
	// 	messageType: "emergencyAccepted",
	// 	userDetails: this.userdetails
	// }

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertController: AlertController,
		private _mqttService: MqttService,
		private geolocation: Geolocation,
		private storage: Storage,
		private app: App,
		private acceptEmergencyService: MqttServiceProvider) {

		// this.storage.get('userid').then(value => {
		// 	this.userdetails.userid = value;
		// 	console.log("when user accept emergency, loggedIn user", this.userdetails.userid);
		// });

		// this.geolocation.getCurrentPosition().then((resp) => {
		// 	this.userdetails.lat = resp.coords.latitude;
		// 	this.userdetails.lng = resp.coords.longitude;
		// }).catch((error) => {
		// 	console.log('Error getting location', error);
		// });

		this.notifications = navParams.get('notifications');
		// console.log(`notification page` + JSON.stringify(this.notifications));

		// if (this.notifications.length !== 0) {
		// 	this.userdetails.victimId = this.notifications[0].victimId;
		// }

		//console.log("notification length", this.notifications.length);
	}

	archiveTodo(todoIndex) {
		let todoToBeArchieved = this.notifications[todoIndex];
		this.notifications.splice(todoIndex, 1);

	}
	openTodoAlert() {
		let addTodoAlert = this.alertController.create({
			title: "Add a row",
			message: "Enter your row",
			inputs: [{
				type: "text",
				name: "addTodoInput"
			}],
			buttons: [{
				text: "Decline"
			},
			{
				text: "Add Row",
				handler: (inputData) => {
					let todoText;
					todoText = inputData.addTodoInput;
					this.notifications.push(todoText);
				}
			}
			]
		});
		addTodoAlert.present()
	}

	loadMap(data) {
		this.navCtrl.push(MapPage, {
			data: data
		});
	}

	acceptEmergency(notification) {
		 ;
		// console.log("emergency alert for victim", this.userdetails.victimId);
		// this.message = `<m2m:rqp xmlns:m2m="http://www.onem2m.org/xml/protocols"><op>1</op><to>oneMPOWER-IN-CSE/ERXAE/common</to><fr>C_ERX</fr><rqi>m_crtae152567755568</rqi><ty>4</ty><pc><m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols"><cnf>application/json</cnf><con>${JSON.stringify(this.alertDetails)}</con></m2m:cin></pc></m2m:rqp>`;
		// console.log(`when user accept emergency >>>user details`, JSON.stringify(this.userdetails));
		// console.log('<<<<<<<<<<publish on topic for accept alert>>>>>>>', this.message);
		// this.unsafePublish(this.topic, this.message);
		this.acceptEmergencyService.acceptEmergency( notification.victimId);
		this.navCtrl.popToRoot();
		// console.log("we are landing to this page after accept clicked!!",this.app.navPop());
		// this.navCtrl.pop();
	}

	// public unsafePublish(topic: string, message: string): void {
	// 	this._mqttService.unsafePublish(topic, message, { qos: 1, retain: false });
	// 	//this._mqttService.publish(topic,message, {qos: 1, retain: true});
	// }
}
