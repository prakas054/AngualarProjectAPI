import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsermgmtService {

  private apiUrl = environment.apiEndpoint;

  constructor(private http:HttpClient) { }

  getAdminUserList():Observable<any[]>{
     return this.http.get<any[]>(this.apiUrl + "/api/Registration");
  }

  getPatientUserList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + "/api/Registration/GetPatientList");
 }

  updateUserStatus(userObj:any):Observable<any>{
    return this.http.post<any>(this.apiUrl + "/api/Admin/UpdateUserStatus", userObj);
  }
  
}
