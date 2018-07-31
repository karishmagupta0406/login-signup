import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth.service';
import { VictimHomePage } from '../victim-home/victim-home';
import { VolunteerHomePage } from '../volunteer-home/volunteer-home';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
// import { UtiliesProvider } from '../../providers/Utilies';
// import { Device } from '@ionic-native/device';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loggedInUser: any;
  createSuccess = false;
  registerCredentials = { name: '', email: '', mobileNumber: '', userType:'', lat: 0, lng: 0};
  constructor(private navCtrl: NavController, 
              private alertCtrl: AlertController,
              private auth: AuthServiceProvider,
              private storage: Storage,
              private geolocation: Geolocation
            ) {
  }

  signup(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.registerCredentials.lat = resp.coords.latitude;
      this.registerCredentials.lng = resp.coords.longitude;
      console.log(this.registerCredentials);
      this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          console.log(this.registerCredentials.userType);
          if(success.status === "500" || success.status === "400"){
            this.showPopup("Error", success.messageObject.message);
            this.navCtrl.popToRoot();
          } else {
            this.showPopup("Success", success.messageObject.message);
            this.storage.set('isLogged',true);
            this.storage.set('registerData',this.registerCredentials);
            this.storage.set('userType',this.registerCredentials.userType);
            this.storage.set('userid',this.registerCredentials.email);
            this.storage.set('username',this.registerCredentials.name);
            // this.utiliesProvider.updateGeolocation(this.device.uuid, this.registerCredentials.lat,this.registerCredentials.lat);
            // this.storage.get('username').then((val) =>{
            //   this.loggedInUser = val;
            // })
            this.createSuccess = true;
          }
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
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
