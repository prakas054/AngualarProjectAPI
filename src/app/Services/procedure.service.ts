import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  private apiUrl = environment.apiEndpoint + "/api/Procedure"; 
  constructor(private http:HttpClient) { }

  getProcedurList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  getProcedurById(id:number):Observable<any>{
    return this.http.get<any[]>(this.apiUrl + "/" + id);
 }

  AddProcedur(procedureObj:any):Observable<any>{
    return this.http.post(this.apiUrl,procedureObj);
  }

  updateProcedur(id:number,procedureObj:any):Observable<any>{
     return this.http.put(this.apiUrl+ "?id=" + id, procedureObj);
  }
}