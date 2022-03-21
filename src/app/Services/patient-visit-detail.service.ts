import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitDetailService {

  private apiUrl = environment.apiEndpoint;
  constructor(private httpObj:HttpClient) { }

  AddvitalData(visitObj:any):Observable<any>{
    debugger;
    return this.httpObj.post(this.apiUrl + "/api/PatientVisits/AddPatientVisit", visitObj);
  }

  addDignosisData(diagnosisObjlist:any[]):Observable<any>{
    debugger;
    return this.httpObj.post(this.apiUrl + "/api/PatientVisits/AddPatientDiagnosis", diagnosisObjlist);
  }

  addProcedureData(procedureObjlist:any[]):Observable<any>{
    debugger;
    return this.httpObj.post(this.apiUrl + "/api/PatientVisits/AddPatientProcedures", procedureObjlist);
  }

  addMedicationeData(medicationObjlist:any[]):Observable<any>{
    debugger;
    return this.httpObj.post(this.apiUrl + "/api/PatientVisits/AddPatientMedications", medicationObjlist);
  }
}
