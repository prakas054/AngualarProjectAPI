import { Component, OnInit } from '@angular/core';
import { VisitDetailsService } from 'src/app/Services/visit-details.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  allPatientVisitHistory: any[] = [];
  user: any = "";
  userdata: any = "";
  email: string = "";
  userId: number = 0;
  userName: string = "";
  
  constructor(private allPatientHistory:VisitDetailsService) { }

  ngOnInit(): void {
    this.getAllPatientVisitHistory();
  }

  getAllPatientVisitHistory(){
    this.allPatientHistory.getAllPatientVisitHistory().subscribe((data) =>
     {
       this.allPatientVisitHistory=data;
       console.log(this.allPatientVisitHistory);
      })
  }

}
