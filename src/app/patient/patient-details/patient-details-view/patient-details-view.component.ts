import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { last, lastValueFrom } from 'rxjs';
import { PatientDetails } from 'src/app/models/patient-detail';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { PatientAllergy } from 'src/app/models/Patient-Allergy';
import { PatientAllergyService } from 'src/app/Services/patient-allergy.service';

@Component({
  selector: 'app-patient-details-view',
  templateUrl: './patient-details-view.component.html',
  styleUrls: ['./patient-details-view.component.css']
})
export class PatientDetailsViewComponent implements OnInit {

  // form:FormGroup = new FormGroup({
    
  // });
  Patient_Id:number = 0;
  Title:string = "";
  FirstName:string = "";
  LastName:string = "";
  EmailId:string = "";
  DOB:Date = new Date();
  Age:number = 0;
  ContactNo:string = "";
  Gender:string = "";
  Race:string = "";
  Ethnicity:string = "";
  Language:string = "";
  Address:string = "";
  Emergency_Title:string = "";
  Emergency_FirstName:string = "";
  Emergency_LastName:string = "";
  Emergency_EmailId:string = "";
  Emergency_ContactNo:string = "";
  Emergency_Relation:string = "";
  Emergency_Address:string = "";
  Access_To_Patient_Portal:boolean=false;
  Allergy_Details:boolean=false;

  
  getId:any=0;
  patientdetails:any;  
  patientallergydetail:PatientAllergy[] = [];

  user: any = "";
  userdata: any = "";
  email: string = "";
  userId: number = 0;
  constructor(private router:Router,
              private fb:FormBuilder,
              private service:PatientDetailsService,
              private allergyservice:PatientAllergyService ,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.router.navigateByUrl('/');
    // }
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    debugger;
    this.getId = this.route.snapshot.params["id"];
     this.getPatientdetails(this.getId)

     this.getPatientAllergy(this.userId)
  }

  getPatientdetails(id:number){
    this.service.getPatientDetailsId(id).subscribe( (response:PatientDetails[])=> {
      this.patientdetails = response;
      console.log(this.patientdetails);
      
      this.Title = this.patientdetails.title;
      this.FirstName = this.patientdetails.firstName;
      this.LastName = this.patientdetails.lastName;
      this.DOB = this.patientdetails.dob;
      this.EmailId = this.patientdetails.emailId;
      this.Age = this.patientdetails.age;
      this.ContactNo = this.patientdetails.contactNo;
      this.Gender = this.patientdetails.gender;
      this.Race = this.patientdetails.race;
      this.Ethnicity = this.patientdetails.ethnicity;
      this.Language = this.patientdetails.language;
      this.Address = this.patientdetails.address;
      this.Emergency_FirstName = this.patientdetails.emergency_FirstName;
      this.Emergency_LastName = this.patientdetails.emergency_LastName;
      this.Emergency_EmailId = this.patientdetails.emergency_EmailId;
      this.Emergency_ContactNo = this.patientdetails.emergency_ContactNo;
      this.Emergency_Relation = this.patientdetails.emergency_Relation;
      this.Emergency_Address = this.patientdetails.emergency_Address;
  });
}

getPatientAllergy(id:number){
  debugger
  this.allergyservice.getPatientAllergyDetails(id).subscribe((response:PatientAllergy[]) => {
    this.patientallergydetail = response;
    console.log(this.patientallergydetail)
  });
}

}

