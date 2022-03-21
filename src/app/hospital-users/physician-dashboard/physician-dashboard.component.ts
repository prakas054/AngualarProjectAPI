import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentListByUser } from 'src/app/models/AppointmentListByUser';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-physician-dashboard',
  templateUrl: './physician-dashboard.component.html',
  styleUrls: ['./physician-dashboard.component.css']
})
export class PhysicianDashboardComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = [];
  dataSource :any; 
  
  AppointmentArray : AppointmentListByUser[] =[];

  user: any = "";
  userdata: any = "";  
  userId: number = 0;
  userRoleId:number = 0;

  constructor(private route:Router, private service:AppointmentService) { }
  

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.userRoleId = this.userdata.roles[0].roleId;
    this.appointmentData(this.userId);
  }

  appointmentData(userId:number)
  {
    if(this.userRoleId == 4)
    { 
      debugger;
      this.displayedColumns = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PatientName'];
      console.log("------PhysicianDashboardComponent------physician logon");
      this.service.getAppointmenforPhysician(userId).subscribe( (result)=> {
        this.AppointmentArray = result;
        debugger;
        console.log(result)
        console.log(this.AppointmentArray);

        this.dataSource = new MatTableDataSource(this.AppointmentArray);
        this.dataSource.sort=this.sort; 
        this.dataSource.paginator = this.paginator;
     })
    }
    else if(this.userRoleId == 3)
    {
      debugger;
      this.displayedColumns = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PatientName', 'PhysicianName'];
      console.log("------PhysicianDashboardComponent------Nurse logon");  
      this.service.getAppointmenforNurse(userId).subscribe( (result)=> {
        this.AppointmentArray = result;

        debugger;
        console.log(result)
        console.log(this.AppointmentArray);
        
        this.dataSource = new MatTableDataSource(this.AppointmentArray);
        this.dataSource.sort=this.sort; 
        this.dataSource.paginator = this.paginator;
     })
    }
  }

}
