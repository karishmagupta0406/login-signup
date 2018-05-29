import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service'
import { VictimHomePage } from '../victim-home/victim-home';
import { VolunteerHomePage } from '../volunteer-home/volunteer-home';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginSuccess = false;
  userType = '';
  loggedInUser = '';
  loginCredentials = { username: '', password: ''};
  constructor(private navCtrl: NavController, 
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    
    this.auth.login(this.loginCredentials).subscribe(success => {
      if (success) {
        this.userType = success.data;
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.storage.set('username',this.loginCredentials.username);
          this.storage.set('isLogged',true);
          this.storage.set('userType',this.userType);

          this.storage.get('username').then((val) =>{
            this.loggedInUser = val;
          })
          
          this.loginSuccess = true;
        }
      } else {
        this.showPopup("Error", "Problem in Login.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  directToSignUp(){
    this.navCtrl.push(SignupPage);
  }


  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.loginSuccess) {
              if(this.userType === 'Victim'){
                this.navCtrl.setRoot(VictimHomePage);                
                this.navCtrl.push(VictimHomePage,{loggedInUser : this.loggedInUser});
                
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
