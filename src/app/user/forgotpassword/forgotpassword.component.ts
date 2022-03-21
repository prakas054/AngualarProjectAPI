import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2,HostBinding } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MailRequest } from 'src/app/models/maildata';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  
  forgotpwdForm !:FormGroup
  constructor(private fb:FormBuilder, private route:Router, 
              private service:LoginService, private notify:ToastrService) { }

  ngOnInit(): void {
     this.forgotpwdForm = this.fb.group({
          email: new FormControl("", [Validators.required,Validators.email]),
     })
  }

  forgotpassword(){

      let dt = this.forgotpwdForm.value.email;

     debugger;
     if(this.forgotpwdForm.valid){
         let mailObj:MailRequest = new MailRequest();
         mailObj.ToEmail = this.forgotpwdForm.value.email;
         mailObj.Subject = "Forgot Password";
         mailObj.Body = "";

         this.service.forgotpwd(mailObj).subscribe((response:any)=> {
           this.route.navigateByUrl("/");
           this.notify.success("Mail Send Successfully","Success");
         },
         (error : HttpErrorResponse)=>{
            this.notify.error(error.error, "Error");         
      });
     }
     else{
            alert("Form is not valid");
     }
  }

}
