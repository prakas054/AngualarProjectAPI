import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  private apiUrl = environment.apiEndpoint + "/api/Allergy"; 
  constructor(private httpObj:HttpClient) { }

  getAllAllergy():Observable<any>{
     return this.httpObj.get<any[]>(this.apiUrl);
  }

  getAllergyById(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

  AddAllergy(allergyObj:any):Observable<any[]>{
    return this.httpObj.post<any[]>(this.apiUrl,allergyObj);
  }

  updateAllergy(id:number,allergyObj:any):Observable<any>{
     return this.httpObj.put(this.apiUrl+ "?id=" + id, allergyObj);
  }
}
