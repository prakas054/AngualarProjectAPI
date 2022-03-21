import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Procedure } from 'src/app/models/procedure';
import { ProcedureService } from 'src/app/Services/procedure.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {

  form:FormGroup = new FormGroup({});
  
  constructor(private fb:FormBuilder, private route:Router, 
    private service:ProcedureService,private notify:ToastrService) { }

  ngOnInit(): void {

    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }
    
    this.form = this.fb.group({
      procedureId : new FormControl(""),
      procedureCode: new FormControl("", Validators.required),
      procedureDescription: new FormControl("", Validators.required),
      procedureDepricated: new FormControl("yes")
    });
  }

  frm_procedureSubmit_click(){
    if(this.form.valid){      
      debugger;
      
      let procedureObj:Procedure = new Procedure();
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
      this.service.AddProcedur(procedureObj).subscribe( (res:any)=> {
        this.route.navigate(["/admin-procedurelist"]);
        this.notify.success("Data Saved Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      })
    }
  }

  btnCancel_click(){
    window.location.href ="/admin-procedurelist";
  }

}
