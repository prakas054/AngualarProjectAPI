import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-visitdetails',
  templateUrl: './patient-visitdetails.component.html',
  styleUrls: ['./patient-visitdetails.component.css']
})
export class PatientVisitdetailsComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router) { }

  isFormSubmitted: boolean = false;
  public message: string = "";
  diagnosisdescription:any = "Diagnosis description";
  proceduredescription:any = "Procedure description";
  drugid:any ="Drug Id";
  drugname:any = "Drug Name";
  drugbrandname:any = "Drug Brand Name";
  drugform:any = "Drug Form";
  druggenericname:any = "Drug Generic Name";
  patientvisitdetail: FormGroup = new FormGroup({});
  patientdetails: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
    
    this.patientvisitdetail = this.fb.group({
      height: new FormControl("", [Validators.required,Validators.max(250)]),
      bodytemperature:new FormControl("",Validators.required),
      weight:new FormControl("",Validators.required),
      respirationrate:new FormControl("",Validators.required),
      bloodpressure:new FormControl("",Validators.required),
      diagnosiscode:new FormControl("",Validators.required),
      diagnosisdepriciated:new FormControl("",Validators.required),
      procedurecode:new FormControl("",Validators.required),
      procedureisdepriciated:new FormControl("",Validators.required),
      drugid:new FormControl("",Validators.required),
      // drugform:new FormControl("",Validators.required)
    });
    this.patientdetails = this.fb.group({
      diagnosisdescription:new FormControl("",[Validators.required,Validators.minLength(10)]),
      proceduredescription:new FormControl("",[Validators.required,Validators.minLength(10)]),
      drugdetails:new FormControl("",[Validators.required,Validators.minLength(10)]),
    });
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.patientvisitdetail.value)
    if (!this.patientvisitdetail.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.patientvisitdetail.value)
      return true;
    }
  }

  btnCancel_click(){
    window.location.href ="/patient-dashboard";
  }

}
