import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { diagnosis } from 'src/app/models/diagnosis';
import { VisitDetailsService } from 'src/app/Services/visit-details.service';

@Component({
  selector: 'app-visitdetailslist',
  templateUrl: './visitdetailslist.component.html',
  styleUrls: ['./visitdetailslist.component.css']
})
export class VisitdetailslistComponent implements OnInit {

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

  visitHistory: any = [diagnosis];
  constructor(private route: Router, private visitservice: VisitDetailsService, private router: ActivatedRoute) { }

  
  ngOnInit(): void {
    // this.user = localStorage.getItem("PMSUser");
    // this.userdata = JSON.parse(this.user);
    // this.userId = this.userdata.userId;
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
    this.route.navigate(["/visit-detail"]);
  }
}
