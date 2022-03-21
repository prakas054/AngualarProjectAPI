import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { changepassword } from 'src/app/models/changepassword';
import { LoginService } from 'src/app/Services/login.service';
import { confirmvalidator } from '../confirmvalidator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit { 

  form:FormGroup = new FormGroup({});
  username:string="";

  constructor(private fb:FormBuilder, private router:Router, 
              private route:ActivatedRoute, private service:LoginService,
              private notify:ToastrService) { }

  ngOnInit(): void {

    debugger;
    this.username = this.route.snapshot.params["email"];

    this.form = this.fb.group({
        oldpwd: new FormControl("", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
        newpwd: new FormControl("", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
        confirmpwd: new FormControl("", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])
    },{
      validator : confirmvalidator('newpwd','confirmpwd')
    })
  }

  
  changepwd_click(){

    if(this.form.valid)
    {
      let changepwdObj:changepassword = new changepassword();
      changepwdObj.email = this.username;
      changepwdObj.password = this.form.value.oldpwd;
      changepwdObj.newpassword = this.form.value.newpwd;

      this.service.changepwd(changepwdObj).subscribe((response:any)=> {
        this.router.navigateByUrl("/");
        this.notify.success("Password Changed Successfully","Success");
      },
      (error:HttpErrorResponse)=> {
        this.notify.error(error.error,"Error");
      });
    }
    else
    {
      alert("Form is not valid");
    }
  }

}
