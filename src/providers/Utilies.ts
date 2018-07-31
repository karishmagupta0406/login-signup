import * as firebase from 'Firebase';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()

export class UtiliesProvider{
    ref = firebase.database().ref('geolocations/');
    constructor( ){

    }

    updateGeolocation(uuid, lat, lng) {
        if(localStorage.getItem('mykey')) {
          firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
            uuid: uuid,
            latitude: lat,
            longitude : lng
          });
        } else {
          let newData = this.ref.push();
          newData.set({
            uuid: uuid,
            latitude: lat,
            longitude: lng
          });
          localStorage.setItem('mykey', newData.key);
        }
      }

}