import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
	map:any;
	infoWindow: any;
	public todos=["karishma"];
	public archievedTodos=[]; 
	
  constructor(public navCtrl: NavController, private alertController:AlertController) {
  		
  }
  

  
      
  archiveTodo(todoIndex){
  	let todoToBeArchieved=this.todos[todoIndex];
  	this.todos.splice(todoIndex, 1);
  	
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
  			this.todos.push(todoText);	
  		}
  	}
  	]
  	});
  	addTodoAlert.present()
  }

}
