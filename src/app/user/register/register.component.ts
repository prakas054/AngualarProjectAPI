import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { hospitalUser } from 'src/app/models/hospitaluser';
import { PatientReg } from 'src/app/models/patient-reg';
import { UserregService } from 'src/app/Services/userreg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  disablefld:boolean=true;

  constructor(private formbuilder: FormBuilder,private route:Router,
              private service: UserregService,private notify:ToastrService) { }

  isFormSubmitted:boolean = false;
  public message: string = "";
  public message1: string = "";
  public alertmessage: string = "";
  public dob: any = null;
  
  public dateformat:any = null;
  userRegForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.userRegForm=this.formbuilder.group({
        title:['Mr.',Validators.required],
        firstname:['',Validators.required],
        lastname:['',Validators.required],
        email:['',[Validators.required, Validators.email]],
        dob:['',Validators.required],
        employeeId: ['', Validators.required],
        role:['',Validators.required],
        username:[''],
      })
    
      debugger;      
      let randNumber =Math.floor(Math.random() * (1000 + 1));
      this.userRegForm.controls['employeeId'].setValue(randNumber);
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.userRegForm.valid) {
      this.message1='Please provide all the required values!';
      return false;
    } else {

      debugger;
      let regObj:PatientReg = new PatientReg();
      regObj.Title = this.userRegForm.value.title;
      regObj.FirstName = this.userRegForm.value.firstname;
      regObj.LastName = this.userRegForm.value.lastname;
      regObj.EmailId = this.userRegForm.value.email;
      regObj.DOB = this.userRegForm.value.dob;
      regObj.ContactNo = this.userRegForm.value.phone;
      regObj.EmployeeId = this.userRegForm.value.employeeId;     
      regObj.Role = this.userRegForm.value.role;
      regObj.Status = "Active";
      //regObj.Password = "Password123@";

      this.service.registerUser(regObj).subscribe( (response:any) => {
          this.route.navigateByUrl('/userlist');
          this.notify.success("User registered Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      })

      // console.log(this.userRegForm.value)
      // alert("Your data is saved successfully!");
      return true;
    }
  }

  btncancel_click(){
     this.route.navigateByUrl("/userlist");
  }
}
