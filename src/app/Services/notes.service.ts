import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = environment.apiEndpoint + "/api/Notes";
  private addNoteUrl = "/SendNote";

  constructor(private httpObj:HttpClient) { }

  sendNotes(noteObj:any):Observable<any>{
    return this.httpObj.post(this.apiUrl + this.addNoteUrl, noteObj);
  }

  getSentNotes(id:number):Observable<any[]>{
    return this.httpObj.get<any[]>(this.apiUrl + "/SentNotes/" + id);
  }

  getReceivedNotes(id:number):Observable<any[]>{
    return this.httpObj.get<any[]>(this.apiUrl + "/ReceivedNotes/" + id);
  }
}
