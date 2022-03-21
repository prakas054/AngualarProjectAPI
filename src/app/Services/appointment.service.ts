import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiEndpoint + "/api/Appointment";

  

  constructor(private httpObj:HttpClient) { }

  getAllAppointment():Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl);
 }

  AddAppointment(AppointmentObj:any):Observable<any>{
     return this.httpObj.post(this.apiUrl, AppointmentObj);
  }  

  getAppointmenById(id:number):Observable<any>{
    return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 }

 updateAppointmen(id:number,AppointmentObj:any):Observable<any>{
  return this.httpObj.put(this.apiUrl+ "/" + id, AppointmentObj);
}

deleteAppointmen(id:number):Observable<any>{
  return this.httpObj.delete(this.apiUrl+ "/" + id);
}

getAppointmenforPhysician(id:number):Observable<any>{
  return this.httpObj.get<any[]>(this.apiUrl  + "/GetPhysicianAppointments/" + id);
}

getAppointmenforPatient(id:number):Observable<any>{
  return this.httpObj.get<any[]>(this.apiUrl  + "/GetPatientAppointments/" + id);
}

getAppointmenforNurse(id:number):Observable<any>{
  return this.httpObj.get<any[]>(this.apiUrl  + "/GetNurseAppointments/" + id);
}

 declineAppointment(id:number,status:any):Observable<any>{
   return this.httpObj.put<any>(this.apiUrl+ "/Decline?id=" + id + "&&status=" + status,"");
 }
  
}
