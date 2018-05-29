import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service';
import { VictimHomePage } from '../victim-home/victim-home';
import { VolunteerHomePage } from '../volunteer-home/volunteer-home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  createSuccess = false;
  registerCredentials = { name: '', email: '', mobileNumber: '', userType:'', token : ''};
  constructor(private navCtrl: NavController, 
              private alertCtrl: AlertController,
              private auth: AuthServiceProvider,
              private storage: Storage
            ) {
  }

  signup(){
    this.storage.get('token').then((val) => {
      console.log('Token is', val);
      this.registerCredentials.token = val;
    });
    console.log(this.registerCredentials);

    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        console.log(this.registerCredentials.userType);
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.createSuccess = true;
        }
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              if(this.registerCredentials.userType === 'Victim'){
                this.navCtrl.setRoot(VictimHomePage);                
                this.navCtrl.push(VictimHomePage,{loggedInUser : this.registerCredentials.email});
                
              } else{
              this.navCtrl.push(VolunteerHomePage);
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

}
