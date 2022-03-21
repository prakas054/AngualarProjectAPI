import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] =[];
  dataSource :any; 
  AppointmentArray : any[] =[];
  popup = false
  appointId : number = 0;

  user:any="";
  userdata:any="";
  userId: number = 0;
  userRoleId:number = 0;

  constructor(private route:Router, private service:AppointmentService, private notify: ToastrService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.userRoleId = this.userdata.roles[0].roleId;

    if(this.userRoleId == 4)
    { 
      debugger;
      this.displayedColumns = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PatientName', "Actions"];
      console.log("------AppointmentListComponent------physician logon");
      this.service.getAppointmenforPhysician(this.userId).subscribe( (result)=> {
        this.AppointmentArray = result;
        this.arrangeData(this.AppointmentArray);
     })
    }
    else if(this.userRoleId == 3)
    {
      debugger;
      this.displayedColumns = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PatientName', 'PhysicianName', "Actions"];
      console.log("------AppointmentListComponent------Nurse logon");  
      this.service.getAppointmenforNurse(this.userId).subscribe( (result)=> {
        this.AppointmentArray = result;
        this.arrangeData(this.AppointmentArray);
     })
    }

    else if(this.userRoleId == 2)
    {
      debugger;
      this.displayedColumns = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PhysicianName', "Actions"];
      console.log("------AppointmentListComponent------Patient logon");  
      this.service.getAppointmenforPatient(this.userId).subscribe( (result)=> {
        this.AppointmentArray = result;
        this.arrangeData(this.AppointmentArray);
     })
    }
  }

  arrangeData(appointArray : any)
  {
    console.log("------AppointmentListComponent------arrangeData");  
    debugger;
    console.log(appointArray);
    this.dataSource = new MatTableDataSource(appointArray);
    this.dataSource.sort=this.sort; 
    this.dataSource.paginator = this.paginator;
  }

  btn_add(){
    this.route.navigate(['/schedule', ""]);
  }

  setAppoitmentId(appointmentId : number)
  {
    this.appointId = appointmentId
  }
  DeleteAppointment_Click()
  {
      this.popup = false
      this.service.deleteAppointmen(this.appointId).subscribe({
        next : result => {
          console.log("Appointment with id "+this.appointId+" has been deleted");
          this.notify.warning("Appointment with id "+this.appointId+" has been deleted", "Warning");
        },

        complete : () => {
          window.location.reload();
      }

      });
  }
}