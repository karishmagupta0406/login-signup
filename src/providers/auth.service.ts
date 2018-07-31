import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

    static readonly REGISTER_URL = "http://10.97.47.208:8081/erx/registerUser";
    static readonly LOGIN_URL = "http://10.97.47.208:8081/erx/login";
    static readonly EmergencyContact_URL = "http://10.97.47.208:8081/erx/registerEmergencyContacts";
    static readonly aedDetails_URL = "http://10.97.47.208:8081/erxlocation/aedDetails";
    static readonly lifeSaved_URL = "http://10.97.47.208:8081/erx/life";

    constructor(public http: Http) { }
    public register(credentials) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.put(AuthServiceProvider.REGISTER_URL, JSON.stringify(credentials), { headers: headers })
            .map(response => response.json());
    }

    public login(credentials) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("username", credentials.username);
        headers.append("password", credentials.password);
        return this.http.get(AuthServiceProvider.LOGIN_URL, { headers: headers }).map(response => response.json());
    }

    public saveEmergencyContact(data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.put(AuthServiceProvider.EmergencyContact_URL, JSON.stringify(data), { headers: headers }).map(Response => Response.json());
    }

    public aedDetails(lat, lng) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("lat", lat);
        headers.append("lng", lng);
        return this.http.get(AuthServiceProvider.aedDetails_URL, { headers: headers }).map(response => response.json());
    }

    public lifeSaved(volunteer, victim) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("volunteerEmail", volunteer);
        headers.append("victimEmail", victim);
        return this.http.get(AuthServiceProvider.lifeSaved_URL, { headers: headers }).map(response => response.json());
    }

}