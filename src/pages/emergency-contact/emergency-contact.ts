import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth.service';
/**
 * Generated class for the EmergencyContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency-contact',
  templateUrl: 'emergency-contact.html',
})
export class EmergencyContactPage {
   userEmail = '';
   medicalHistorySaved = false;

  emergencyContact1 = { name: '', email: '', mobile:''};
  emergencyContact2 ={ name: '', email: '' , mobile: '' };

  constructor(private navCtrl: NavController, 
              private storage: Storage, 
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyContactPage');
  }

  save(){
    this.storage.get('username').then((val) =>{
      console.log('from storage -- login user is', val);
      this.userEmail = val;
    });


    let data = {
      "emergencyContacts" : [this.emergencyContact1, this.emergencyContact2],
      "userEmail": this.userEmail
    };

    console.log(data);
    this.auth.saveEmergencyContact(data).subscribe(success => {
      if (success) {
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.medicalHistorySaved = true;
        }
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
    
    
}

showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK',
        handler: data => {
          if (this.medicalHistorySaved) {
            this.navCtrl.pop();
          }
        }
      }
    ]
  });
  alert.present();
}

}
