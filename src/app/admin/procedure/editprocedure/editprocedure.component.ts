import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Procedure } from 'src/app/models/procedure';
import { ProcedureService } from 'src/app/Services/procedure.service';

@Component({
  selector: 'app-editprocedure',
  templateUrl: './editprocedure.component.html',
  styleUrls: ['./editprocedure.component.css']
})
export class EditprocedureComponent implements OnInit {

  form:FormGroup = new FormGroup({   
    procedureId : new FormControl(""),
    procedureCode: new FormControl("", Validators.required),
    procedureDescription: new FormControl("", Validators.required),
    procedureDepricated: new FormControl("yes")
  });
  editId:number=0;
  procedure:any; 

  constructor(private router:Router,private fb:FormBuilder,
              private service:ProcedureService, private route:ActivatedRoute,
              private notify:ToastrService) { }

  ngOnInit(): void {
    debugger;
    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }

    this.editId = this.route.snapshot.params["id"];
    this.getProcedure(this.editId)
  }

  getProcedure(id:number){
    this.service.getProcedurById(id).subscribe( (response:Procedure)=> {

      this.procedure = response;
      console.log(this.procedure);
    
    this.form.controls['procedureId'].setValue(this.procedure.procedure_ID);
    this.form.controls['procedureCode'].setValue(this.procedure.procedure_Code);
    this.form.controls['procedureDescription'].setValue(this.procedure.procedure_Description);
    if(this.procedure.procedure_Is_Depricated == true)
       this.form.controls['procedureDepricated'].setValue('yes');
    else
       this.form.controls['procedureDepricated'].setValue('no');
  });
  }

  frn_procedure_click(){
    if(this.form.valid){
     debugger;
     
     let procedureObj:Procedure = new Procedure();
     procedureObj.Procedure_ID = this.form.value.procedureId;
     procedureObj.Procedure_Code = this.form.value.procedureCode;
     procedureObj.Procedure_Description = this.form.value.procedureDescription;
     var str = this.form.value.procedureDepricated;      
     if(str == "yes")
     {
       procedureObj.Procedure_Is_Depricated = true;
     }
     else{
       procedureObj.Procedure_Is_Depricated = false;
     }     
     this.service.updateProcedur(procedureObj.Procedure_ID,procedureObj).subscribe( (response:any)=> {
           this.router.navigate(["/admin-procedurelist"]); 
           this.notify.success("Data Saved Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      });    
    }
}

btnCancel_click(){    
 this.router.navigate(["/admin-procedurelist"]);  
}

}
