import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientReg } from 'src/app/models/patient-reg';
import { UserregService } from 'src/app/Services/userreg.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  
  editId:number=0;
  user:any;

  isFormSubmitted:boolean = false;
  public message: string = "";
  public message1: string = "";
  public alertmessage: string = "";
  public dob: any = null;

  userRegForm:FormGroup= new FormGroup({
    userId: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required, Validators.email]),
    dob:new FormControl('',Validators.required),
    employeeId: new FormControl('', Validators.required),
    role:new FormControl('',Validators.required),
    username:new FormControl(''),
  })

  constructor(private router:Router,
              private service: UserregService, 
              private route:ActivatedRoute,
              private datepipe:DatePipe,
              private notify:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem("PMSUser") == null)
    {
      this.router.navigateByUrl('/');
    }

    this.editId = this.route.snapshot.params["id"];
    this.getUserDetails(this.editId);
  }

  getUserDetails(id:number){
     this.service.getUser(id).subscribe( (response:any) => {
          debugger;
          this.user = response;

          this.userRegForm.controls['userId'].setValue(this.user.userId);
          this.userRegForm.controls['title'].setValue(this.user.title);
          this.userRegForm.controls['firstname'].setValue(this.user.firstName);
          this.userRegForm.controls['lastname'].setValue(this.user.lastName);
          this.userRegForm.controls['email'].setValue(this.user.emailId);
          //this.userRegForm.controls['dob'].setValue(this.user.dob);   
          let dobdate = this.datepipe.transform(this.user.dob,'yyyy-MM-dd');       
          this.userRegForm.controls['dob'].setValue(dobdate);          
          this.userRegForm.controls['role'].setValue(this.user.role);
          if(this.user.employeeId != 0)
          {
            this.userRegForm.controls['employeeId'].setValue(this.user.employeeId);
          }
          else
          {
            let randNumber =Math.floor(Math.random() * (1000 + 1));
            this.userRegForm.controls['employeeId'].setValue(randNumber);
          }
          
     });
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.userRegForm.valid) {
      this.message1='Please provide all the required values!';
      return false;
    } else {

      debugger;
      let regObj:PatientReg = new PatientReg();
      regObj.UserId = this.userRegForm.value.userId;
      regObj.Title = this.userRegForm.value.title;
      regObj.FirstName = this.userRegForm.value.firstname;
      regObj.LastName = this.userRegForm.value.lastname;
      regObj.EmailId = this.userRegForm.value.email;
      regObj.DOB = this.userRegForm.value.dob;
      regObj.ContactNo = this.userRegForm.value.phone;
      regObj.EmployeeId = this.userRegForm.value.employeeId;     
      regObj.Role = this.userRegForm.value.role;

      this.service.registerUser(regObj).subscribe( (response:any) => {
          this.router.navigateByUrl('/userlist');
          this.notify.success("User updated Successfully","Success");
      },(error : HttpErrorResponse)=>{
        this.notify.error(error.error, "Error");
      })

      // console.log(this.userRegForm.value)
      // alert("Your data is saved successfully!");
      return true;
    }
  }

  btncancel_click(){
     this.router.navigateByUrl("/userlist");
  }

}
