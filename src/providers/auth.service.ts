import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = "http://10.97.7.173:8080/erx/registerUser";
  static readonly LOGIN_URL = "http://10.97.7.173:8080/erx/login";
  
  constructor(public http: Http) {}
  // Register
  public register(credentials) {
    
      // return Observable.create(observer => {
      //   let headers = new Headers();
      //   headers.append("Content-Type", "application/json");
      //   // let myHeaders = new Headers();
      //   // myHeaders.append('Content-Type', 'application/json');    
      //   // let myParams = new URLSearchParams();
      //   // myParams.append('id', '123');	
      //   //let options = new RequestOptions({ headers: myHeaders, params: myParams });
      //   this.http.post(AuthServiceProvider.REGISTER_URL, JSON.stringify(credentials), {headers: headers})
      //   .map(res => res.json())
      //   .subscribe( data => {
      //     console.log("hello data is here",data);
      //   },
      // err=>{
      //   console.log('err',err);
      // });

      //   observer.next(true);
      //   observer.complete();
      // });

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      return this.http.post(AuthServiceProvider.REGISTER_URL, JSON.stringify(credentials), {headers: headers})
      .map(response => response.json());
  }

  public login(credentials) {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("email", credentials.email);
      headers.append("password",credentials.password);
      return this.http.get(AuthServiceProvider.LOGIN_URL, {headers: headers}).map(response => response.json()); 
  }


}