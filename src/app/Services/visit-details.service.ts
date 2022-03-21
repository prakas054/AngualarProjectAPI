import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitDetailsService {

  private apiUrl = environment.apiEndpoint + "/api/PatientVisits"; 
  
  private visitHistory ="Visithistory";
  private visitdetails = "VisitDetail";
  constructor(private httpObj:HttpClient) { }

  getPatientVisitList(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + this.visitHistory + "/" + id)
  }

  getPatientVisitdetail(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + this.visitdetails + "/" + id)
  }

  getAllPatientVisitHistory():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + "VisithistoryListForPhysician");
  }
}
