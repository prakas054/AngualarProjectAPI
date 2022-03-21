import { AfterViewInit, Component, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentListByUser } from 'src/app/models/AppointmentListByUser';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {  

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PhysicianName'];
  dataSource :any; 
  
  AppointmentArray : AppointmentListByUser[] =[];
  user: any = "";
  userdata: any = "";  
  userId: number = 0;  

  constructor(private route:Router, private service:AppointmentService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.appointmentData(this.userId);
  }

  appointmentData(userId:number)
  {
       this.service.getAppointmenforPatient(userId).subscribe( (result)=> {
      debugger;
       this.AppointmentArray = result;
       this.dataSource = new MatTableDataSource(this.AppointmentArray);
       this.dataSource.sort=this.sort; 
       this.dataSource.paginator = this.paginator;
    })
  }
  
}
