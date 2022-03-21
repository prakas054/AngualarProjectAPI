import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2,HostBinding, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getLogin } from 'src/app/models/getLogin';
import { login } from 'src/app/models/login';
import { userRole } from 'src/app/models/userRole';
import { LoginService } from 'src/app/Services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  
  loginForm !:FormGroup;
  loginAttempts:number=0;

  constructor(private router:Router,private fb:FormBuilder, private service:LoginService,
              private notify:ToastrService) { }  
   
  ngOnInit(): void {  
        this.loginForm = this.fb.group({
          email: new FormControl("", [Validators.required,Validators.email]),
          password: new FormControl("", [Validators.required,Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])
        })
  } 


  login_click()
  {   
     
     let username = this.loginForm.value.email;
     let password = this.loginForm.value.password;
     if(this.loginForm.valid){

        let loginObj:getLogin = new getLogin();
        loginObj.email = username;
        loginObj.password = password;       

         this.service.login(loginObj).subscribe( (response:any)=>{
          debugger;
 
          let roles:userRole[] = [];
          roles = response.roles

          const accesstoken = response.access_token;
          sessionStorage.setItem("AUTH_TOKEN", accesstoken);


          if(response.is_SetDefault == true)
          { 
              this.router.navigateByUrl("/changepwd/" + response.emailId);             
          }
          else
          {
            localStorage.setItem('PMSUser', JSON.stringify(response));                 

            if(roles[0].roleId == 1)
            {
              this.router.navigate(["/admin-dashboard"]);             
            }
            if(roles[0].roleId == 2)
            {
              this.router.navigate(["/patient-dashboard"]);             
            }
            if(roles[0].roleId == 3)
            {
              this.router.navigate(["/physician-dashboard"]);             
            }
            if(roles[0].roleId == 4)
            {
              this.router.navigate(["/physician-dashboard"]);             
            }
            this.notify.success("Login Successful...!","Success");
          }
         },(error : HttpErrorResponse)=>{

          if(this.loginAttempts > 3){
              this.notify.error("PMS Account blocked", "Error");                         
          }
            if(this.loginAttempts == 3){

              debugger;
              this.service.blockuser(loginObj).subscribe( (response:any)=> {
                this.notify.error("PMS Account blocked", "Error");
              })              
            }
            else{
              this.notify.error(error.error, "Error");              
            }
            this.loginAttempts++;
        });       
     }
     else
     { 
       this.notify.error("Please Enter Valid Credential","Error");
     }
  }

  pwd_click()
  {        
     this.router.navigate(['/forgotpwd'])
  }  
}