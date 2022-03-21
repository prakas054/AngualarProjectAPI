import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitDetailsService } from 'src/app/Services/visit-details.service';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {

  user: any = "";
  userdata: any = "";
  email: string = "";
  userId: number = 0;

  

  visit_Id:number=0;
  height:number=0;
  weight:number=0;
  bloodpressure:number=0;
  temperature:number=0;
  respiration:number=0;

  visitHistory: any = [];
  constructor(private route: Router, private visitservice: VisitDetailsService, 
              private router: ActivatedRoute) { }
  
  ngOnInit(): void {   
    debugger
    this.visit_Id = this.router.snapshot.params["id"];
    this.getPateintVisitHistory(this.visit_Id);
  }

  getPateintVisitHistory(id: number) {
    debugger;
    this.visitservice.getPatientVisitdetail(id).subscribe((response) => {
      debugger
      this.visitHistory = response;
      console.log(this.visitHistory.diagnoses);
      console.log(this.visitHistory);
      this.height = this.visitHistory.patientVisits.height;
      this.weight = this.visitHistory.patientVisits.weight;
      this.bloodpressure = this.visitHistory.patientVisits.blood_Pressure;
      this.respiration = this.visitHistory.patientVisits.respiration_Rate;
      this.temperature = this.visitHistory.patientVisits.body_Temperature;
    });
  }
  
  btncancel_click() {
    this.route.navigate(["/patientvisithistory"]);
  }

}
