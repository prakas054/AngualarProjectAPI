import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  private apiUrl = environment.apiEndpoint + "/api/DrugData"; 
  constructor(private httpObj:HttpClient) { }

  getAllDrugs():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl);
 }

  AddDrug(drugObj:any):Observable<any>{
     return this.httpObj.post(this.apiUrl, drugObj);
  }

  getDrugById(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

 updateDrug(id:number,drugObj:any):Observable<any>{
  return this.httpObj.put(this.apiUrl+ "?id=" + id, drugObj);
}
}
