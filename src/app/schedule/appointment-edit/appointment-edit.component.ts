import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Appointment, RegisteredUserAppoint } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { UserregService } from 'src/app/Services/userreg.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  AppointmentArray: any[] = [];
  RegistrationArray: any[] = [];
  appontObj: any ;

  physianObj: RegisteredUserAppoint[] = [];
  patientObj: RegisteredUserAppoint[] = [];
  physicianName: string = "";
  patientName: string = "";
  physiId: number = 0;
  patientId: number = 0;
  nurseId: number = 0;
  appointmentId: number = 0;

  user: any = "";
  userdata: any = "";
  userId: number = 0;
  roleID: number = 0;

  isFormSubmitted: boolean = false;
  message: string = "";
  message1: string = "";

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    appointmentDate: new FormControl('', [Validators.required]),
    appointmentTime: new FormControl('', [Validators.required]),
    physicianName: new FormControl('', Validators.required),
    patientName: new FormControl('', Validators.required),
    reason: new FormControl(''),
    physicianId: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private service: AppointmentService, private serviceUserreg: UserregService,
    private notify: ToastrService,
    private router: Router,
    private datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.roleID = this.userdata.roles[0].roleId;

    let Appoint = this.service.getAllAppointment();
    let reg = this.serviceUserreg.getAllUser();
    this.appointmentId = this.route.snapshot.params["appointmentId"]

    forkJoin([Appoint, reg]).subscribe({
      next: (results) => {
        this.AppointmentArray = results[0];
        this.RegistrationArray = results[1];
        this.arrangeData();
      },
      complete: () => {
        if (this.userdata.roles[0].roleId == 4) {
          console.log("------schedule Appointment------physician logon");
          console.log(this.RegistrationArray);
          this.physiId = this.userdata.userId;
          this.physicianName = this.RegistrationArray.find((x) => x?.userId == this.userdata.userId).name;

          console.log(this.physiId);
          console.log(this.physicianName);
          this.getPatient();
        }
        else if (this.userdata.roles[0].roleId == 3) {
          console.log("------schedule Appointment------Nurse logon");
          this.nurseId = this.userdata.userId;
          console.log(this.nurseId);
          this.getPatient();
          this.getPhysician();
        }
        else if (this.userdata.roles[0].roleId == 2) {
          console.log("------schedule Appointment------Patient logon");
          this.patientId = this.userdata.userId;

          this.patientName = this.RegistrationArray.find((x) => x?.userId == this.userdata.userId).name;

          console.log(this.patientId)
          console.log(this.patientName)
          this.getPhysician();
        }

        this.setFormValue(this.appointmentId);
      } //complete End
    });//forkjoin End
  } //ngOnInit End

  setFormValue(appotId: number) {
    console.log("---AppointmentEditComponent---setFormValue----");
    console.log(this.AppointmentArray);
    this.appontObj = this.AppointmentArray.find(x => x.appointmentId == appotId)
    this.appontObj.appointmentDate = moment(this.appontObj.appointmentDate).format('YYYY-MM-DD');
    this.patientId = this.appontObj.patientId;
    console.log(this.appontObj);
    this.form.patchValue(this.appontObj);
  }

  arrangeData() {
    console.log("I am in arrange data");
    this.AppointmentArray.forEach((appot) => {
      let data = this.RegistrationArray.find((x) => x?.userId == appot.patientId).name;
      appot.patientName = data;

      //console.log("Id = " +appot.patientId+ ", name = " +data);
    });

    this.AppointmentArray.forEach((appot) => {
      let data = this.RegistrationArray.find((x) => x?.userId == appot.physicianId).name;
      appot.physicianName = data;


      //console.log("Id = " +appot.physicianId+ ", name = " +data);
    });


  }

  getPatient() {
    console.log("---AppointmentEditComponent---getPatient----");
    this.RegistrationArray.forEach((appot) => {
      if (appot.role == "Patient") {
        this.patientObj.push(appot)
      }
    });
    console.log(this.patientObj);
  }

  getPhysician() {
    console.log("---AppointmentEditComponent---getPhysician----");

    this.RegistrationArray.forEach((appot) => {
      if (appot.role == "Physician") {
        this.physianObj.push(appot)
      }
    });
    console.log(this.physianObj);
  }

  setUserId(event: any) {
    console.log(event.target.value);
    let data = this.RegistrationArray.find((x) => x?.name === event.target.value);

    if (data.role == "Patient") {
      this.patientId = data?.userId;
      console.log(data?.userId);
    }

    else if (data.role == "Physician") {
      this.physiId = data?.userId;
      console.log(data?.userId);
    }

  }

  appointmentForm_click() {
    let apointmentObj: Appointment = new Appointment();
    apointmentObj.AppointmentId = this.appointmentId;
    apointmentObj.Title = this.form.value.title;
    apointmentObj.AppointmentDate = this.form.value.appointmentDate;
    apointmentObj.AppointmentTime = this.form.value.appointmentTime;
    apointmentObj.Reason = this.form.value.reason;
    apointmentObj.SchedularId = this.userdata.userId;
    apointmentObj.PhysicianId = this.physiId;
    apointmentObj.NurseId = this.nurseId;
    apointmentObj.PatientId = this.patientId;
    apointmentObj.CreatedOn = this.appontObj.createdOn;


    console.log("---------appointmentForm_click-----------");
    console.log(apointmentObj);

    if (this.form.valid) {
      this.service.updateAppointmen(this.appointmentId, apointmentObj).subscribe((response: any) => {
        
        // if (this.userdata.roles[0].roleId == 2) {
        //   this.router.navigate(["/patient-dashboard"]);
        // }
        // else {
          this.router.navigate(["/appointmentlist"]);
        //}
        this.notify.success("Appointment Updated Successfully", "Success");
      });
    }

  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.form.value)
    if (!this.form.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.form.value)
      return true;
    }
  }

  checkCurrentDate(event: any) {
    debugger;
    let selected_date = new Date(event.target.value);
    let current_date = new Date();
    if (current_date.getDate() > selected_date.getDate()) {
      this.form.controls['appointmentDate'].setValue("");
      this.form.controls['appointmentDate'].invalid
    }

    else {
      this.form.controls['appointmentDate'].valid;
    }
  }
  btncancel_click(){

    if (this.userdata.roles[0].roleId == 2) {
      this.router.navigate(["/patient-dashboard"]);
    }
    else
    {
      this.router.navigateByUrl("/appointmentlist");
    }
 }

 checkApointments(event: any) {
  debugger;
  let selected_time = event.target.value;
  console.log(selected_time)
  let selected_date = this.form.controls['appointmentDate'].value;
  let selcted_physician = this.form.controls['physicianId'].value;
  let date = this.datepipe.transform(selected_date, "yyyy-MM-ddT00:00:00");
  console.log(date);

  if (this.roleID == 2) {  //Patient

    if (this.form.controls['physicianName'].value === "") {
      this.form.controls['appointmentTime'].setValue("");
      this.message1 = 'Please select Physician Name';
    }

    let pateint = this.AppointmentArray.filter((x: any) => x.patientId == this.userId);
    console.log(pateint);
    let patient_time = pateint.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("patient time")
    console.log(patient_time);
    let patient_date = patient_time.find((a: any) => a.appointmentDate === date);
    console.log("filter patient date")
    console.log(patient_date)
    let filter_patientdate = this.datepipe.transform(patient_date?.appointmentDate, "yyyy-MM-dd");
    let filter_patienttime = patient_date?.appointmentTime
    console.log("filtered patient values")
    console.log(filter_patientdate)
    console.log(filter_patienttime)

    let selected_physician = this.AppointmentArray.filter((x: any) => x.physicianId == selcted_physician);
    console.log(selected_physician);
    let selected_physician_time = selected_physician.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("selected physiacian time")
    console.log(selected_physician_time);
    let selected_physician_date = selected_physician_time.find((a: any) => a.appointmentDate === date);
    console.log("selected physiacian date")
    console.log(selected_physician_date)
    let filter_selected_physician_date = this.datepipe.transform(selected_physician_date?.appointmentDate, "yyyy-MM-dd");
    let filter_selected_physician_time = selected_physician_date?.appointmentTime

    debugger;
    if (selected_time == filter_patienttime &&
      selected_date == filter_patientdate) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
    else if (selected_date == filter_selected_physician_date &&
      selected_time == filter_selected_physician_time) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
  }
  else if (this.roleID == 4) {  //Physician
    if (this.form.controls['patientName'].value === "") {
      this.form.controls['appointmentTime'].setValue("");
      this.message1 = 'Please select Patient Name';
    }
    let physician = this.AppointmentArray.filter((x: any) => x.physicianId == this.userId);
    console.log(physician);
    let physician_time = physician.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("physician time")
    console.log(physician_time);
    let physician_date = physician_time.find((a: any) => a.appointmentDate === date);
    console.log("filter physician date")
    console.log(physician_date)
    let filter_physiciandate = this.datepipe.transform(physician_date?.appointmentDate, "yyyy-MM-dd");
    let filter_physiciantime = physician_date?.appointmentTime
    console.log("filtered physician values")
    console.log(filter_physiciandate)
    console.log(filter_physiciantime)

    let selected_patient = this.AppointmentArray.filter((x: any) => x.patientId == this.patientId);
    console.log(selected_patient);
    let selected_patient_time = selected_patient.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("selected patient time")
    console.log(selected_patient_time);
    let selected_patient_date = selected_patient_time.find((a: any) => a.appointmentDate === date);
    console.log("selected patient date")
    console.log(selected_patient_date)
    let filter_selected_patient_date = this.datepipe.transform(selected_patient_date?.appointmentDate, "yyyy-MM-dd");
    let filter_selected_patient_time = selected_patient_date?.appointmentTime

    if (selected_time == filter_physiciantime && selected_date == filter_physiciandate) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
    else if (selected_time == filter_selected_patient_time &&
      selected_date == filter_selected_patient_date) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
  }

  if (this.roleID == 3) { //Nurse
    debugger;
    if (this.form.controls['patientName'].value === "") {
      this.form.controls['time'].setValue("");
      this.message1 = 'Please select Patient Name';
    }

    else if (this.form.controls['physicianName'].value === "") {
      this.form.controls['time'].setValue("");
      this.message1 = 'Please select Physician Name';
    }


    let selected_patient = this.AppointmentArray.filter((x: any) => x.patientId == this.patientId);
    console.log(selected_patient);
    let selected_patient_time = selected_patient.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("selected patient time")
    console.log(selected_patient_time);
    let selected_patient_date = selected_patient_time.find((a: any) => a.appointmentDate === date);
    console.log("selected patient date")
    console.log(selected_patient_date)
    let filter_selected_patient_date = this.datepipe.transform(selected_patient_date?.appointmentDate, "yyyy-MM-dd");
    let filter_selected_patient_time = selected_patient_date?.appointmentTime

    let physician = this.AppointmentArray.filter((x: any) => x.physicianId == this.physiId);
    console.log(physician);
    let physician_time = physician.filter((x: any) => x.appointmentTime == event.target.value);
    console.log("physician time")
    console.log(physician_time);
    let physician_date = physician_time.find((a: any) => a.appointmentDate === date);
    console.log("filter physician date")
    console.log(physician_date)
    let filter_physiciandate = this.datepipe.transform(physician_date?.appointmentDate, "yyyy-MM-dd");
    let filter_physiciantime = physician_date?.appointmentTime
    console.log("filtered physician values")
    console.log(filter_physiciandate)
    console.log(filter_physiciantime)

    if (selected_time == filter_physiciantime && selected_date == filter_physiciandate) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
    else if (selected_time == filter_selected_patient_time &&
      selected_date == filter_selected_patient_date) {
      this.form.controls['appointmentTime'].setValue("")
      this.notify.error("This slot is not available at this moment", "Error");
    }
  }

}

 DeleteAppointment_Click()
  {
      this.service.deleteAppointmen(this.appointmentId).subscribe({
        next : result => {
          console.log("Appointment wih appointmentId "+this.appointmentId+" has been deleted");
          this.notify.warning("Appointment with id "+this.appointmentId+" has been deleted", "Warning");
        },

        complete : () => this.router.navigateByUrl("/appointmentlist")

      });
  }

}
