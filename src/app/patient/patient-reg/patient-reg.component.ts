import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientReg } from 'src/app/models/patient-reg';
import { PatientRegService } from 'src/app/Services/patient-reg.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {
  
  employeeId:number=0;
  url:string  = "http://localhost:3000/patientReg";

  constructor(private fb: FormBuilder,private route:Router,private httpObj: HttpClient,private notify: ToastrService,private service:PatientRegService) { }
  patientArray:PatientReg[]  = [];
  obj:PatientReg = new PatientReg();
  password: string = "";
  confirmpassword:string = "";
  isFormSubmitted:boolean = false;
  public message: string = "";
  public message1: string = "";
  public alertmessage: string = "";
  public dob: any = null;
  
  public dateformat:any = null;
  patientReg: FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.patientReg = this.fb.group({
      title: new FormControl("", Validators.required),
      fname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      lname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      dob: new FormControl("", [Validators.required, Validators.max(2021)]),
      phone:new FormControl("",[Validators.required,Validators.pattern("[0-9]{10}")]),
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
      confirmpassword:new FormControl("",[Validators.required]),
    });
  }
 
  mustMatch()
  {
      if(this.password !== this.confirmpassword)
      {
        this.message="Passwords do not match. Please re-enter the password";
      }
    
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.patientReg.valid) {
      this.message1='Please provide all the required values!';
      return false;
    } else {
      console.log(this.patientReg.value)
     // alert("Your data is saved successfully!");
      return true;
    }
  }
  submit_click(){
    if(this.patientReg.valid){
     debugger;

     let randNumber =Math.floor(Math.random() * (1000 + 1));
     
     let patientObj:PatientReg = new PatientReg();
     patientObj.Title = this.patientReg.value.title;
     patientObj.FirstName = this.patientReg.value.fname;
     patientObj.LastName = this.patientReg.value.lname;
     patientObj.EmailId = this.patientReg.value.email;
     patientObj.DOB = this.patientReg.value.dob;
     patientObj.ContactNo = this.patientReg.value.phone;
     patientObj.Password = this.patientReg.value.password;     
     patientObj.Role = "Patient";
     patientObj.EmployeeId = randNumber;
     patientObj.Status="Active";

     this.service.createPatientReg(patientObj).subscribe( (response:any)=> {
           this.route.navigate(['/']);
           this.notify.success("Your Data is saved Successfully", "Success");     
      });    
    }
}

// getPatient_byId(id:number)
//     {
//       this.service.getPatientId(id).subscribe( (response:any) =>{
//         let Obj:any = response;
//         this.patientReg.value.title = Obj.Title;
//         this.patientReg.value.fname = Obj.First_Name;
//         this.patientReg.value.lname =  Obj.Last_Name;
//         this.patientReg.value.email = Obj.email;
//         this.patientReg.value.dob = Obj.Dob;
//         this.patientReg.value.phone = Obj.Phone;
//     });
//   }

  

  btnCancel_click()
  {
     this.route.navigate(['/'])
  }

}
