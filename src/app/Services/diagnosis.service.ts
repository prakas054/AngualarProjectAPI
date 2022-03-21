import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private apiUrl = environment.apiEndpoint + "/api/Diagnosis"; 
  constructor(private httpObj:HttpClient) { }

  getAllDiagnosis():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl);
  }

  AddDiagnosis(diagnosisObj:any): Observable<any>{
    return this.httpObj.post(this.apiUrl, diagnosisObj);
  }

  getDiagnosisId(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

 updateDiagnosis(id:number,diagnosisObj:any):Observable<any>{
  return this.httpObj.put(this.apiUrl+ "?id=" + id, diagnosisObj);
}
}
