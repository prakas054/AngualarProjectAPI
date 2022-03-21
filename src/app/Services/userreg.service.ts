import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserregService {

  private apiUrl = environment.apiEndpoint + "/api/Registration"; 
  constructor(private httpObj:HttpClient) { }


  getUserList():Observable<any[]>{
    return this.httpObj.get<any[]>(this.apiUrl);
  }

  getUser(id:number):Observable<any>{
    return this.httpObj.get<any>(this.apiUrl + "/" + id);
  }

  registerUser(regObj:any):Observable<any>{
     return this.httpObj.post(this.apiUrl, regObj);
  }

  updateUser(id:number,regObj:any):Observable<any>{
      return this.httpObj.put(this.apiUrl + "/" + id, regObj);
  }

  getRegstByRoleName(requestRole:string):Observable<any[]>
  {
    return this.httpObj.get<any[]>(this.apiUrl+ "/GetAll").pipe(
      map(res => {
        return  res.filter(item => item.role == requestRole);
    })
  );
  }

  getAllUser():Observable<any[]>
  {
    return this.httpObj.get<any[]>(this.apiUrl+ "/GetAll");
  }
}
