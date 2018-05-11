import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service'
import { VictimHomePage } from '../victim-home/victim-home';
import { VolunteerHomePage } from '../volunteer-home/volunteer-home';
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
  loginCredentials = { username: '', password: ''};
  constructor(private navCtrl: NavController, 
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.auth.login(this.loginCredentials).subscribe(success => {
      if (success) {
        console.log("my userType is ", success.data);
        this.userType = success.data;
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.loginSuccess = true;
        }
      } else {
        this.showPopup("Error", "Problem in Login.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
    // this.navCtrl.push(TabsPage,{},{animate: false});
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
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

}
