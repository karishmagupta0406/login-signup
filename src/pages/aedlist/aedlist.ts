import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth.service'
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var google;

@IonicPage()
@Component({
  selector: 'page-aedlist',
  templateUrl: 'aedlist.html',
})
export class AedlistPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public http: Http, private authService: AuthServiceProvider, private geolocation: Geolocation) {

    
  }

  ionViewDidLoad() {
    this.displayGoogleMap();
    this.getMarkers();
    console.log('ionViewDidLoad aedhome page');
  }

 

  // ionViewWillEnter() {
  //   this.displayGoogleMap();
  //   this.getMarkers();
  // }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(28.45595, 77.0266);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    // this.http.get('assets/data/aed.json')
    // .map((res) => res.json())
    // .subscribe(data => {
    //    this.addMarkersToMap(data);
    //   console.log("aed data", JSON.stringify(data));
    // });

    //AED details from API call

    this.geolocation.getCurrentPosition().then((resp) => {
       this.authService.aedDetails(resp.coords.latitude,resp.coords.longitude).subscribe(data => {
        this.addMarkersToMap(data.data);
        console.log("aed data", JSON.stringify(data.data));
      },
        error => {
          console.log("Error", error);
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

 
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      console.log("aed list ... adding marker on map", JSON.stringify(marker, marker.lng, marker.lng));
      var position = new google.maps.LatLng(marker.lat, marker.lng);
      if(marker.available){
        var dogwalkMarker = new google.maps.Marker({position: position, title: marker.name,icon: 'assets/imgs/aed.png'});
      } else {
        var dogwalkMarker = new google.maps.Marker({position: position, title: marker.name,icon: 'assets/imgs/aed-unavaiable.png'});
      }
      dogwalkMarker.setMap(this.map);
    }
  }

}
