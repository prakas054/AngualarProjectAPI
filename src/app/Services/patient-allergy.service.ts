import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientAllergyService {

  private apiUrl = environment.apiEndpoint + "/api/PatientAllergy"; 
  private patientAllergy = "GetPatientAllergyDetails";
  constructor(private httpObj:HttpClient) { }

  getAllPatientAllergy():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl);
  }

  AddPatientAllergy(patientAllergyObj:any): Observable<any>{
    return this.httpObj.post(this.apiUrl, patientAllergyObj);
  }

  getPatientAllergyId(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

 updatePatientAllergy(id:number,patientAllergyObj:any):Observable<any>{
  return this.httpObj.put(this.apiUrl+ "?id=" + id, patientAllergyObj);
}
getPatientAllergyDetails(id:number):Observable<any>{
  return this.httpObj.get<any[]>(this.apiUrl + "/" + this.patientAllergy +"/"+ id);
}
deletePatientAllergy(id:number):Observable<any>{
  return this.httpObj.delete(this.apiUrl+ "/" + "?id=" + id);
}
}
