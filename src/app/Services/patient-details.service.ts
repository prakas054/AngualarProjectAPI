import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {

  private apiUrl = environment.apiEndpoint + "/api/PatientDetails"; 
  private demographicUrl = "GetPatientDemoGraphicDetails";
  constructor(private httpObj:HttpClient) { }

  getAllPatientDetails():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl);
  }

  AddPatientDetails(patientDetailsObj:any): Observable<any>{
    return this.httpObj.post(this.apiUrl, patientDetailsObj);
  }

  getPatientDetailsId(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

 updatePatientDetails(id:number,patientDetailsObj:any):Observable<any>{
  return this.httpObj.put(this.apiUrl+ "?id=" + id, patientDetailsObj);
}

getPatientDemographicDetails(id:number):Observable<any>{
  return this.httpObj.get<any[]>(this.apiUrl + "/" + this.demographicUrl + "/" + id)
}

}
