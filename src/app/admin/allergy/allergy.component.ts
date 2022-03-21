import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allergy } from 'src/app/models/allergy';
import { AllergyService } from 'src/app/Services/allergy.service';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {

  form:FormGroup = new FormGroup({});

  editId:number=0;

  constructor(private router:Router,private fb:FormBuilder,
              private service:AllergyService,private notify:ToastrService) { }

  ngOnInit(): void {

    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }
   
    this.form = this.fb.group({
       allergyCode:new FormControl("", Validators.required),
       allergyType:new FormControl("", Validators.required),
       allergyName:new FormControl("", Validators.required),
       allergyDesc:new FormControl(""),
       allergyClinicalInfo:new FormControl("", Validators.required),
       allergySource:new FormControl(""),
       allerginicity:new FormControl("")       
    });
  }

  frn_allergy_click(){
       if(this.form.valid){
        debugger;
        
        let allergyObj:Allergy = new Allergy();
        allergyObj.Allergy_Code = this.form.value.allergyCode;
        allergyObj.Allergy_Type = this.form.value.allergyType;
        allergyObj.Allergy_Name = this.form.value.allergyName;
        allergyObj.Allergy_Description = this.form.value.allergyDesc;
        allergyObj.Allergy_Clinical_Information = this.form.value.allergyClinicalInfo;
        allergyObj.Allergy_Source = this.form.value.allergySource;
        allergyObj.allerginicity = this.form.value.allerginicity;

        this.service.AddAllergy(allergyObj).subscribe( (response:any)=> {
              this.router.navigate(["/admin-allergylist"]); 
              this.notify.success("Data Saved Successfully","Success");
         },(error : HttpErrorResponse)=>{
               this.notify.error(error.error, "Error");
        });    
       }
  }

  btnCancel_click(){    
    this.router.navigate(["/admin-allergylist"]);  
  }

}
