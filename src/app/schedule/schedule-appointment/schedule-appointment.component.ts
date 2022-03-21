import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment, RegisteredUserAppoint } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { UserregService } from 'src/app/Services/userreg.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {

  physicianObj: RegisteredUserAppoint[] = [];
  patientObj: RegisteredUserAppoint[] = [];
  physicianName: string = "";
  patiName: string = "";
  physiId!: number ;
  patientId: number = 0;
  nurseId: number = 0;
  appoiDatestr: string = "";
  appointmentDate: Date = new Date();

  user: any = "";
  userdata: any = "";
  userId: number = 0;
  roleID: number = 0;



  isFormSubmitted: boolean = false;
  message: string = "";
  message1: string = "";
  appointmentArray: any = [];


  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    physianName: new FormControl('', Validators.required),
    patientName: new FormControl('', Validators.required),
    description: new FormControl(''),
    physicianId: new FormControl(''),
  });


  constructor(private service: AppointmentService,
    private serviceRegist: UserregService,
    private route: Router,
    private router: Router,
    private notify: ToastrService,
    private datepipe: DatePipe,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.roleID = this.userdata.roles[0].roleId;

    this.appointment_List();

    debugger;
    var date = new Date();
    //var dtstr = this.datepipe.transform(date, "yyyy-MM-dd");
    
    let year = date.getFullYear();
    let month = this.datepipe.transform(date,"MM");
    let day = this.datepipe.transform(date,"dd");

    this.appoiDatestr = year + "-" + month + "-" + day;  

    if (this.activatedRoute.snapshot.params["appoiDatestr"]) {
      this.appoiDatestr = this.activatedRoute.snapshot.params["appoiDatestr"];
      console.log(this.appoiDatestr);
    }

    if (this.userdata.roles[0].roleId == 4) {
      console.log("------schedule Appointment------physician logon");
      this.physiId = this.userdata.userId;

      this.serviceRegist.getRegstByRoleName("Physician").subscribe((resultPhysician) => {
        this.physicianName = resultPhysician.find(x => x.userId == this.userdata.userId).name;
        console.log("Pysician Object")
        console.log(this.physicianName);
      })

      console.log(this.physiId)
      this.getAllPatient();
    }
    else if (this.userdata.roles[0].roleId == 3) {
      debugger;
      console.log("------schedule Appointment------Nurse logon");
      this.nurseId = this.userdata.userId;
      this.getAllPhysician();
      this.getAllPatient();
    }
    else if (this.userdata.roles[0].roleId == 2) {
      console.log("------schedule Appointment------Patient logon");
      this.patientId = this.userdata.userId;

      this.serviceRegist.getRegstByRoleName("Patient").subscribe((resultPatient) => {
        this.patiName = resultPatient.find(x => x.userId == this.userdata.userId).name;;
        console.log("Patient patientName")
        console.log(this.patiName);
      })

      console.log(this.patientId);
      this.getAllPhysician();
    }
  }
  getAllPhysician() {
    this.serviceRegist.getRegstByRoleName("Physician").subscribe((resultPhysician) => {
      this.physicianObj = resultPhysician;
      console.log("Pysician Object")
      console.log(this.physicianObj);
    })
  }
  getAllPatient() {
    this.serviceRegist.getRegstByRoleName("Patient").subscribe((resultPatient) => {
      this.patientObj = resultPatient;
      console.log("Patient Object")
      console.log(this.patientObj);
    })
  }

  setId(event: any) {
    console.log("-----schedule Appointment-----setId")
    let data = this.physicianObj.find((x) => x?.name === event.target.value);
    this.physiId = data?.userId ?? 0;
    console.log(event.target.value);
    console.log(this.physiId);
  }
  setpatientId(event: any) {
    let data = this.patientObj.find((x) => x?.name === event.target.value);
    this.patientId = data?.userId ?? 0;
    console.log("I am in setpatientId");
    console.log(event.target.value);
    console.log(data?.userId);
  }
  appointmentForm_click() {
    let apointmentObj: Appointment = new Appointment();
    apointmentObj.Title = this.form.value.title;
    apointmentObj.AppointmentDate = this.form.value.date;
    apointmentObj.AppointmentTime = this.form.value.time;
    apointmentObj.Reason = this.form.value.description;
    apointmentObj.SchedularId = this.userdata.userId;
    apointmentObj.PhysicianId = this.physiId;
    apointmentObj.NurseId = this.nurseId;
    apointmentObj.PatientId = this.patientId;
    apointmentObj.Status = "created";


    console.log(apointmentObj)
    if (this.form.valid) {
      this.service.AddAppointment(apointmentObj).subscribe((response: any) => {

        // if (this.userdata.roles[0].roleId == 2) {
        //   this.router.navigate(["/patient-dashboard"]);
        // }
        // else {
          this.router.navigate(["/appointmentlist"]);
       // }


        this.notify.success("Appointment scheduled Successfully", "Success");
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

  appointment_List() {
    this.service.getAllAppointment().subscribe((result: Appointment[]) => {
      this.appointmentArray = result;
      console.log(this.appointmentArray);
    });
  }

  checkCurrentDate(event: any) {
    debugger;
    let selected_date = new Date(event.target.value);
    let current_date = new Date();
    // let timeDiff = Math.abs(current_date.getDate() - selected_date.getDate());
    // console.log("Time difference")
    // console.log(timeDiff)
    if (current_date.getDate() > selected_date.getDate()) {
      this.form.controls['date'].setValue("");
      this.form.controls['date'].invalid;
    }

    else {
      this.form.controls['date'].valid;
    }

  }

  btncancel_click() {
    this.route.navigateByUrl("/calendar");
  }

  checkApointments(event: any) {
    debugger;
    let selected_time = event.target.value;
    console.log(selected_time)
    let selected_date = this.form.controls['date'].value;
    let selcted_physician = this.form.controls['physicianId'].value;
    let date = this.datepipe.transform(selected_date, "yyyy-MM-ddT00:00:00");
    console.log(date);

    if (this.roleID == 2) { //Patient

      if (this.form.controls['physianName'].value === "") {
        this.form.controls['time'].setValue("");
        this.message1 = 'Please select Physician Name';
      }

      let pateint = this.appointmentArray.filter((x: any) => x.patientId == this.userId);
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

      let selected_physician = this.appointmentArray.filter((x: any) => x.physicianId == selcted_physician);
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
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
      else if (selected_date == filter_selected_physician_date &&
        selected_time == filter_selected_physician_time) {
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
    }
    else if (this.roleID == 4) { //Physician
      debugger
      if (this.form.controls['patientName'].value === "") {
        this.form.controls['time'].setValue("");
        this.message1 = 'Please select Patient Name';
      }
      let physician = this.appointmentArray.filter((x: any) => x.physicianId == this.userId);
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

      let selected_patient = this.appointmentArray.filter((x: any) => x.patientId == this.patientId);
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
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
      else if (selected_time == filter_selected_patient_time &&
        selected_date == filter_selected_patient_date) {
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
    }
    if (this.roleID == 3) { //Nurse
      debugger;
      if (this.form.controls['patientName'].value === "") {
        this.form.controls['time'].setValue("");
        this.message1 = 'Please select Patient Name';
      }

      else if (this.form.controls['physianName'].value === "") {
        this.form.controls['time'].setValue("");
        this.message1 = 'Please select Physician Name';
      }


      let selected_patient = this.appointmentArray.filter((x: any) => x.patientId == this.patientId);
      console.log(selected_patient);
      let selected_patient_time = selected_patient.filter((x: any) => x.appointmentTime == event.target.value);
      console.log("selected patient time")
      console.log(selected_patient_time);
      let selected_patient_date = selected_patient_time.find((a: any) => a.appointmentDate === date);
      console.log("selected patient date")
      console.log(selected_patient_date)
      let filter_selected_patient_date = this.datepipe.transform(selected_patient_date?.appointmentDate, "yyyy-MM-dd");
      let filter_selected_patient_time = selected_patient_date?.appointmentTime

      let physician = this.appointmentArray.filter((x: any) => x.physicianId == this.physiId);
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
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
      else if (selected_time == filter_selected_patient_time &&
        selected_date == filter_selected_patient_date) {
        this.form.controls['time'].setValue("")
        this.notify.error("This slot is not available at this moment", "Error");
      }
    }


  }

}
