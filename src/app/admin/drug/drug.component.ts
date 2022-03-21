import { validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { FactoryTarget } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { drug } from 'src/app/models/drug';
import { DrugService } from 'src/app/Services/drug.service';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.css']
})
export class DrugComponent implements OnInit {

 form:FormGroup = new FormGroup({});

  constructor(private fb:FormBuilder, private route:Router, 
              private service:DrugService,private notify:ToastrService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }
    this.form = this.fb.group({
       drugId: new FormControl(""),
       drugName: new FormControl("", Validators.required),
       drugGenericName: new FormControl("", Validators.required),
       drugManufactureName: new FormControl("", Validators.required),
       drugForm:new FormControl("", Validators.required),
       drugStrength : new FormControl("", Validators.required)
    })
  }

  btn_drugSubmit_click(){
    if(this.form.valid){
      
       debugger;
       let drugObj:drug = new drug();
       drugObj.Drug_Name = this.form.value.drugName;
       drugObj.Drug_Generic_Name = this.form.value.drugGenericName;
       drugObj.Drug_Manufacture_Name = this.form.value.drugManufactureName;
       drugObj.Drug_Form = this.form.value.drugForm;
       drugObj.Drug_Strength = this.form.value.drugStrength;

       this.service.AddDrug(drugObj).subscribe( (result:any) => {
            this.route.navigateByUrl('/admin-druglist');
            this.notify.success("Data Saved Successfully","Success");
       },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      });      
    }
  }

  btnCancel_click(){
    window.location.href ="/admin-druglist";
  }

}
