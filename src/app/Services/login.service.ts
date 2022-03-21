import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {filter} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiEndpoint + "/api/Login"; 

  constructor(private http:HttpClient) { }

  login(loginObj:any):Observable<any>{
    return this.http.post(this.apiUrl,loginObj);  
  }

  changepwd(changepwdObj:any):Observable<any>{
    return this.http.post(this.apiUrl + "/ChangePassword", changepwdObj);
  }

  forgotpwd(mailObj:any):Observable<any>{
    return this.http.post(environment.apiEndpoint + "/api/Mail/SendForgotPwdMail", mailObj);
  }

  blockuser(loginObj:any):Observable<any>{
    return this.http.post(this.apiUrl + "/BlockUser", loginObj);
  }
}
