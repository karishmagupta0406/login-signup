import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service'
import { VictimHomePage } from '../victim-home/victim-home';
import { VolunteerHomePage } from '../volunteer-home/volunteer-home';
import { SignupPage } from '../signup/signup';
import { UtiliesProvider } from '../../providers/Utilies';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
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
  location = {lat : 0, lng: 0}
  constructor(private navCtrl: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    private utiliesProvider: UtiliesProvider,
    private device: Device,
    private geolocation: Geolocation) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.location.lat = resp.coords.latitude;
        this.location.lng = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    
    this.auth.login(this.loginCredentials).subscribe(success => {
      if (success) {
        this.userType = success.data.userType;
        
        console.log(success);
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.storage.set('userid',this.loginCredentials.username);
          this.storage.set('isLogged',true);
          this.storage.set('userType',this.userType);
          this.storage.set('username',success.data.userName);
          this.loginSuccess = true;
          this.utiliesProvider.updateGeolocation(this.device.uuid, this.location.lat,this.location.lng);
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
                this.navCtrl.push(VictimHomePage);
                
              } else{
              this.navCtrl.push(VolunteerHomePage);
              this.navCtrl.setRoot(VolunteerHomePage);
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

}
