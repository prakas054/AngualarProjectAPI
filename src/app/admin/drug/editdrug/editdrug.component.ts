import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { drug } from 'src/app/models/drug';
import { DrugService } from 'src/app/Services/drug.service';


@Component({
  selector: 'app-editdrug',
  templateUrl: './editdrug.component.html',
  styleUrls: ['./editdrug.component.css']
})
export class EditdrugComponent implements OnInit {

  form:FormGroup = new FormGroup({
    drugId: new FormControl(""),
    drugName: new FormControl("", Validators.required),
    drugGenericName: new FormControl("", Validators.required),
    drugManufactureName: new FormControl("", Validators.required),
    drugForm:new FormControl("", Validators.required),
    drugStrength : new FormControl("", Validators.required)
  });
  editId:number=0;
  drug:any;
  constructor(private router:Router,private fb:FormBuilder,
              private service:DrugService, private route:ActivatedRoute,
              private notify:ToastrService) { }

  ngOnInit(): void {    
    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }
    this.editId = this.route.snapshot.params["id"];
    this.getDrug(this.editId)
  }

  getDrug(id:number){
    this.service.getDrugById(id).subscribe( (response:drug)=> {

      this.drug = response;
      console.log(this.drug);

    this.form.controls['drugId'].setValue(this.drug.drug_ID);
    this.form.controls['drugName'].setValue(this.drug.drug_Name);
    this.form.controls['drugGenericName'].setValue(this.drug.drug_Generic_Name);
    this.form.controls['drugManufactureName'].setValue(this.drug.drug_Manufacture_Name);
    this.form.controls['drugForm'].setValue(this.drug.drug_Form);
    this.form.controls['drugStrength'].setValue(this.drug.drug_Strength);
  });
  }

  frn_drug_click(){
    if(this.form.valid){
     debugger;
     
     let drugObj:drug = new drug();
     drugObj.Drug_ID = this.form.value.drugId;
     drugObj.Drug_Name = this.form.value.drugName;
     drugObj.Drug_Generic_Name = this.form.value.drugGenericName;
     drugObj.Drug_Manufacture_Name = this.form.value.drugManufactureName;
     drugObj.Drug_Form = this.form.value.drugForm;
     drugObj.Drug_Strength = this.form.value.drugStrength;
     
     this.service.updateDrug(drugObj.Drug_ID,drugObj).subscribe( (response:any)=> {
           this.router.navigate(["/admin-druglist"]); 
           this.notify.success("Data updated Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      });    
    }
}

btnCancel_click(){    
 this.router.navigate(["/admin-druglist"]);  
}

}
