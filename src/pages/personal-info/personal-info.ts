import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth.service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {
  user = { name: '', email: '', mobileNumber:'', address: ''};
  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private storage: Storage) {
    this.storage.get('userid').then(value => {
      this.username = value;
      console.log("get data for user", this.username);
      this.authService.getUserProfile(this.username).subscribe(data => {
        console.log(data);
        this.user.address = 'Harman, Gurgaon';
        this.user.name = data.data.name;
        this.user.mobileNumber = data.data.mobileNumber;
        this.user.email = data.data.email;
      },
        error => {
          console.log("Error", error);
        });
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

}
