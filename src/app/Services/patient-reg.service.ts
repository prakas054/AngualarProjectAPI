import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientRegService {

  private apiUrl = environment.apiEndpoint + "/api/Registration"; 
  private apiUrl1 = environment.apiEndpoint + "/api/Registration/GetPatientList"; 
  
  constructor(private httpObj: HttpClient) { }

  getAllPatientReg(): Observable<any> {
    return this.httpObj.get<any[]>(this.apiUrl);
  }
  getAllPatient(): Observable<any> {
    return this.httpObj.get<any[]>(this.apiUrl1);
  }
  // getRegstByRoleName(requestRole:string):Observable<any[]>
  //   {
  //   return this.httpObj.get<any[]>(this.apiUrl1).pipe(
  //     map(res => {
  //       return  res.filter(item => item.role == requestRole);
  //   })
  //   );
  // }

  getPatientId(id: number): Observable<any> {
    return this.httpObj.get(this.apiUrl + "/" + id);
  }

  createPatientReg(patientObj: any): Observable<any> {
    return this.httpObj.post(this.apiUrl, patientObj);
  }

  // editPatientReg(patientObj: any): Observable<any> {
  //   let strUrl = this.url + "/" + patientObj.patientId;
  //   return this.httpObj.put(strUrl, patientObj);
  // }

}
