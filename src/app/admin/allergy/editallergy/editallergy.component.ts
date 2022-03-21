import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allergy } from 'src/app/models/allergy';
import { AllergyService } from 'src/app/Services/allergy.service';

@Component({
  selector: 'app-editallergy',
  templateUrl: './editallergy.component.html',
  styleUrls: ['./editallergy.component.css']
})
export class EditallergyComponent implements OnInit {

  form:FormGroup = new FormGroup({
    allergyId:new FormControl('',Validators.required),
    allergyCode:new FormControl('', Validators.required),
    allergyType:new FormControl('', Validators.required),
    allergyName:new FormControl('', Validators.required),
    allergyDesc:new FormControl(''),
    allergyClinicalInfo:new FormControl('', Validators.required),
    allergySource:new FormControl(''),
    allerginicity:new FormControl("")   
  });
  editId:number=0;
  allergy:any;  

  constructor(private router:Router,private fb:FormBuilder,
              private service:AllergyService, private route:ActivatedRoute,
              private notify:ToastrService) { }

  ngOnInit(): void {
    debugger;    
    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }
    
    this.editId = this.route.snapshot.params["id"];
    this.getAllergy(this.editId)
  }

  getAllergy(id:number){
    this.service.getAllergyById(id).subscribe( (response:Allergy)=> {

      this.allergy = response;
      console.log(this.allergy);

    this.form.controls['allergyId'].setValue(this.allergy.allergy_Id);
    this.form.controls['allergyCode'].setValue(this.allergy.allergy_Code);
    this.form.controls['allergyType'].setValue(this.allergy.allergy_Type);
    this.form.controls['allergyName'].setValue(this.allergy.allergy_Name);
    this.form.controls['allergyDesc'].setValue(this.allergy.allergy_Description);
    this.form.controls['allergyClinicalInfo'].setValue(this.allergy.allergy_Clinical_Information);
    this.form.controls['allergySource'].setValue(this.allergy.allergy_Source);
    this.form.controls['allerginicity'].setValue(this.allergy.allerginicity);
   
  });
  }

  frn_allergy_click(){
       if(this.form.valid){
        debugger;
        
        let allergyObj:Allergy = new Allergy();
        allergyObj.Allergy_Id = this.form.value.allergyId;
        allergyObj.Allergy_Code = this.form.value.allergyCode;
        allergyObj.Allergy_Type = this.form.value.allergyType;
        allergyObj.Allergy_Name = this.form.value.allergyName;
        allergyObj.Allergy_Description = this.form.value.allergyDesc;
        allergyObj.Allergy_Clinical_Information = this.form.value.allergyClinicalInfo;
        allergyObj.Allergy_Source = this.form.value.allergySource;
        allergyObj.allerginicity = this.form.value.allerginicity;
        
        this.service.updateAllergy(allergyObj.Allergy_Id,allergyObj).subscribe( (response:any)=> {
              this.router.navigate(["/admin-allergylist"]); 
              this.notify.success("Data Updated Successfully","Success");
         },(error : HttpErrorResponse)=>{
          this.notify.error(error.error, "Error");
         });    
       }
  }

  btnCancel_click(){    
    this.router.navigate(["/admin-allergylist"]);  
  }

}
