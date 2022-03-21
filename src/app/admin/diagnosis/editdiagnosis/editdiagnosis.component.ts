import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { diagnosis } from 'src/app/models/diagnosis';
import { DiagnosisService } from 'src/app/Services/diagnosis.service';

@Component({
  selector: 'app-editdiagnosis',
  templateUrl: './editdiagnosis.component.html',
  styleUrls: ['./editdiagnosis.component.css']
})
export class EditdiagnosisComponent implements OnInit {

  form:FormGroup = new FormGroup({
    diagnosisId:new FormControl('', Validators.required),
    diagnosisCode:new FormControl('', Validators.required),
    diagnosisDescription:new FormControl('', Validators.required),
    diagnosisDepriciated:new FormControl('', Validators.required),
  });
  editId:number=0;
  diagnosis:any;  

  constructor(private router:Router,private fb:FormBuilder,
              private service:DiagnosisService, private route:ActivatedRoute,
              private notify:ToastrService) { }

  ngOnInit(): void {
    debugger;
    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }

    this.editId = this.route.snapshot.params["id"];
    this.getDiagnosis(this.editId)
  }
  getDiagnosis(id:number){
    this.service.getDiagnosisId(id).subscribe( (response:diagnosis)=> {

      this.diagnosis = response;
      console.log(this.diagnosis);
    
    this.form.controls['diagnosisId'].setValue(this.diagnosis.diagnosis_Id);
    this.form.controls['diagnosisCode'].setValue(this.diagnosis.diagnosis_Code);
    this.form.controls['diagnosisDescription'].setValue(this.diagnosis.diagnosis_Description);
    if(this.diagnosis.diagnosis_Is_Depricated == true)
       this.form.controls['diagnosisDepriciated'].setValue('yes');
    else
       this.form.controls['diagnosisDepriciated'].setValue('no');
  });
  }

  frn_diagnosis_click(){
    if(this.form.valid){
     debugger;
     
     let diagnosisobj:diagnosis = new diagnosis();
     diagnosisobj.Diagnosis_Id = this.form.value.diagnosisId;
     diagnosisobj.Diagnosis_Code = this.form.value.diagnosisCode;
     diagnosisobj.Diagnosis_Description = this.form.value.diagnosisDescription;
     var str = this.form.value.diagnosisDepriciated;
     diagnosisobj.Diagnosis_Is_Depricated = str;
     if(str == "yes")
      {
        diagnosisobj.Diagnosis_Is_Depricated = true;
      }
      else{
        diagnosisobj.Diagnosis_Is_Depricated = false;
      }
     
     this.service.updateDiagnosis(diagnosisobj.Diagnosis_Id,diagnosisobj).subscribe( (response:any)=> {
           this.router.navigate(["/admin-diagnosislist"]); 
           this.notify.success("Data Saved Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      });    
    }
}

btnCancel_click(){    
 this.router.navigate(["/admin-diagnosislist"]);  
}


}
