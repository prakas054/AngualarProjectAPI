import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { diagnosis } from 'src/app/models/diagnosis';
import { DiagnosisService } from 'src/app/Services/diagnosis.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  form:FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, private route:Router, 
              private service:DiagnosisService,private notify:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }
    
    this.form = this.fb.group({
      diagnosisId : new FormControl(""),
      diagnosisCode: new FormControl("", Validators.required),
      diagnosisDescription: new FormControl("", Validators.required),
      diagnosisIsDepricated: new FormControl("")
    });
  }

  frm_diagnosisSubmit_click(){
    if(this.form.valid){      
      debugger;
      
      let diagnosisObj:diagnosis = new diagnosis();
      diagnosisObj.Diagnosis_Code = this.form.value.diagnosisCode;
      diagnosisObj.Diagnosis_Description = this.form.value.diagnosisDescription;
      var str = this.form.value.diagnosisIsDepricated;
      //diagnosisObj.Diagnosis_Is_Depricated = str;
      if(str == "yes")
      {
        diagnosisObj.Diagnosis_Is_Depricated = true;
      }
      else{
        diagnosisObj.Diagnosis_Is_Depricated = false;
      }
      this.service.AddDiagnosis(diagnosisObj).subscribe( (res:any)=> {
        this.route.navigate(["/admin-diagnosislist"]);
        this.notify.success("Data Saved Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      })
    }
  }

  btnCancel_click(){
    window.location.href ="/admin-diagnosislist";
  }

}
