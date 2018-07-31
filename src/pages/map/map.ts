import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})

export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    markers = [];
    directionsDisplay: any;
    directionsService: any;
    notificationData: any;
    victimDetails: { lat: any; lng: any; };
    aedDetails: { lat: any; lng: any; };

    constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation, private navParams: NavParams) {
        platform.ready().then(() => {
            this.notificationData = navParams.get('data');
            console.log(this.notificationData);

            this.victimDetails = { lat: this.notificationData.victimDetails.lat, lng: this.notificationData.victimDetails.lng };
            console.log("map page, victim details", JSON.stringify(this.victimDetails));
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad VictimHomePage');
        this.initMap();
    }

    initMap() {
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsService = new google.maps.DirectionsService;
        //var first = new google.maps.LatLng(this.aedDetails.lat, this.aedDetails.lng);
        //var first = new google.maps.LatLng(28.5449, 77.1281);

        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
            let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            console.log(resp.coords.latitude, resp.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                zoom: 15,
                center: mylocation
            });
            this.directionsDisplay.setMap(this.map);

             if (this.notificationData.messageType === 'GrpNotVolunteerDD') {
               // if(1 === 1){
                console.log("assigning route VIA AED volunteer");
                var aed = new google.maps.LatLng(this.notificationData.aedDetails.lat, this.notificationData.aedDetails.lng);
                //var aed = new google.maps.LatLng(28.5921, 77.0460);
                console.log("aed locations", aed);

                this.directionsService.route({
                    origin: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
                    destination: new google.maps.LatLng(this.victimDetails.lat, this.victimDetails.lng),
                    //destination: new google.maps.LatLng(28.5562, 77.1000),
                    waypoints: [{ location: aed, stopover: false }],
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode['WALKING']
                }, (res, status) => {

                    if (status == google.maps.DirectionsStatus.OK) {
                        var leg = res.routes[0].legs[0];
                        var snap_path = res.routes[0].overview_path;
                        console.log("map page", snap_path);
                        this.generatePath(snap_path);
                        this.makeMarker(leg.start_location, this.icons.start, "Volunteer", this.map);
                        this.makeMarker(leg.end_location, this.icons.end, 'Victim', this.map);
                        this.makeMarker(aed, this.icons.aed, 'AED', this.map);

                    } else {
                        console.log('error');
                        console.warn(status);
                    }

                });

            } else if (this.notificationData.messageType === 'GrpNotVolunteerFA') {
                console.log('assigining route directly of First AID volunteer');
                this.directionsService.route({
                    origin: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
                    destination: new google.maps.LatLng(this.victimDetails.lat, this.victimDetails.lng),
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode['WALKING']
                }, (res, status) => {

                    if (status == google.maps.DirectionsStatus.OK) {
                        var leg = res.routes[0].legs[0];
                        var snap_path = res.routes[0].overview_path;
                        console.log("map page", snap_path);
                        this.generatePath(snap_path);
                        this.makeMarker(leg.start_location, this.icons.start, "Volunteer", this.map);
                        this.makeMarker(leg.end_location, this.icons.aed, 'Victim', this.map);
                    } else {
                        console.log('error');
                        console.warn(status);
                        alert("Unable to retrive route");
                    }

                });

            }
        });


        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
            this.deleteMarkers();
            let updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            let image = 'assets/imgs/current.png';
            this.addMarker(updatelocation, image);
            this.setMapOnAll(this.map);
        });


    }

    addMarker(location, image) {
        let marker = new google.maps.Marker({
            title: "me",
            position: location,
            map: this.map,
            icon: image
        });
        this.markers.push(marker);
    }

    setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    clearMarkers() {
        this.setMapOnAll(null);
    }

    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
    }

    makeMarker(position, icon, title, map) {
        new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: title
        });
    }

    generatePath(path) {

        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
        };

        var traceroutePath = new google.maps.Polyline({
            strokeColor: '#FF0000',
            strokeOpacity: 0,
            icons: [{
                icon: lineSymbol,
                offset: '0',
                repeat: '20px'
            }],
            map: this.map
        });
        traceroutePath.setPath(path);
    }

    icons = {
        start: new google.maps.MarkerImage(
            'assets/imgs/flag-blue.png',
            new google.maps.Size(44, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(22, 32)),
        end: new google.maps.MarkerImage(
            'assets/imgs/flag-red.png',
            new google.maps.Size(44, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(22, 32)),
        aed: new google.maps.MarkerImage(
            'assets/imgs/flag-green.png',
            new google.maps.Size(44, 32),
            new google.maps.Point(0, 0),
            new google.maps.Point(22, 32))
    };

}
