import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { MqttModule, MqttService } from 'ngx-mqtt';
declare var google: any;

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
	map:any;
	infoWindow: any;
	public notifications=["Victim1"];
	public archievedTodos=[]; 
	topic: string = `/oneM2M/req/ID-CSE-01:C_ERX/ID-CSE-01/xml`;
	userdetails = { lat: 0, lng: 0, userid: 'karishma.jain@gmail.com' };
	alertDetails = {
		messageType:"emergencyAlert",
		userdetails: this.userdetails
	}
	
  constructor(public navCtrl: NavController, 
	private alertController:AlertController,
	private _mqttService: MqttService,
	private geolocation: Geolocation,
	private storage: Storage) {
		// this.storage.get('username').then(value =>{
		// 	this.userdetails.userid = value;
		//   });	
		this.geolocation.getCurrentPosition().then((resp) => {
			this.userdetails.lat = resp.coords.latitude;
			this.userdetails.lng = resp.coords.longitude;
		   }).catch((error) => {
			 console.log('Error getting location', error);
		   });
  }
  
  archiveTodo(todoIndex){
  	let todoToBeArchieved=this.notifications[todoIndex];
  	this.notifications.splice(todoIndex, 1);
  	
  }
  openTodoAlert(){
  	let addTodoAlert=this.alertController.create({
  	title:"Add a row",
  	message:"Enter your row",
  	inputs:[{
  	type:"text",
  	name:"addTodoInput"
  	}],
  	buttons:[{
  		text:"Decline"
  	},
  	{
  		text:"Add Row",
  		handler:(inputData)=>{
  			let todoText;
  			todoText=inputData.addTodoInput;
  			this.notifications.push(todoText);	
  		}
  	}
  	]
  	});
  	addTodoAlert.present()
  }

  loadMap(data){
	// this.geolocation.getCurrentPosition().then((resp) => {
	// 	this.userdetails.lat = resp.coords.latitude;
	// 	this.userdetails.lng = resp.coords.longitude;
	//    }).catch((error) => {
	// 	 console.log('Error getting location', error);
	//    });
	this.message = `<m2m:rqp xmlns:m2m="http://www.onem2m.org/xml/protocols"><op>1</op><to>oneMPOWER-IN-CSE/ERXAE/common</to><fr>C_ERX</fr><rqi>m_crtae152567755568</rqi><ty>4</ty><pc><m2m:cin xmlns:m2m="http://www.onem2m.org/xml/protocols"><cnf>application/json</cnf><con>${JSON.stringify(this.alertDetails)}</con></m2m:cin></pc></m2m:rqp>`;
	 console.log(`user details`, JSON.stringify(this.userdetails));
	 console.log('<<<<<<<<<<publish on topic for accept alert>>>>>>>', this.message);
     this.unsafePublish(this.topic,JSON.stringify(this.message));
	  this.navCtrl.push(MapPage, {
		data: data
	  });
  }
  public unsafePublish(topic: string, message: string): void {
	this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
	//this._mqttService.publish(topic,message, {qos: 1, retain: true});
  }
}
