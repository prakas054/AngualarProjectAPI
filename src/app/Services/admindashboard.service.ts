import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  private apiUrl = environment.apiEndpoint + "/api/Admin/Dashboard";

  constructor(private http:HttpClient) { }

  getdashboardcount():Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }
}
