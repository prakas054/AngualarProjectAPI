import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendnotesService {

  private apiUrl = environment.apiEndpoint + "/api/SendNotes"; 
  constructor(private httpObj:HttpClient) { }

  // getSendNotes():Observable<any>{
  //   return this.httpObj.get<any[]>(this.apiUrl);
  // }

  postSendNotes(sendNotesObj:any): Observable<any>{
    return this.httpObj.post(this.apiUrl, sendNotesObj);
  }

  // getSendNotesbyId(id:number):Observable<any>{
  //   return this.httpObj.get<any[]>(this.apiUrl + "/" + id);
 //}

 
}
