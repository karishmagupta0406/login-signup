import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service'
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
  createSuccess = false;
  loginCredentials = { email: '', password: ''};
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
        if(success.status === "500" || success.status === "400"){
          this.showPopup("Error", success.messageObject.message);
          this.navCtrl.popToRoot();
        } else {
          this.showPopup("Success", success.messageObject.message);
          this.createSuccess = true;
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
            if (this.createSuccess) {
              this.navCtrl.push(TabsPage);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
