import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppointmentListByUser, AppointmentListByUserForWeek } from 'src/app/models/AppointmentListByUser';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DatePipe } from '@angular/common';
import { Appointment } from 'src/app/models/appointment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-upcomingappointment',
  templateUrl: './upcomingappointment.component.html',
  styleUrls: ['./upcomingappointment.component.css']
})
export class UpcomingappointmentComponent implements OnInit {

  constructor(private route:Router, private service:AppointmentService, private datepipe:DatePipe,private notify: ToastrService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.appointmentData(this.userId);
 
    
 
  }

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  displayedColumns:string[] = ['AppointmentId','Title', 'AppointmentDate', 'AppointmentTime', 'PatientName','Action'];
  dataSource :any; 
  
 

  AppointmentArray : AppointmentListByUserForWeek[] =[];
  user: any = "";
  userdata: any = "";  
  userId: number = 0;  
  compaireWeekDay:any=[];
  array:any[] =[];
  currentDateTime:Date = new Date();
  DateBefor7Days:Date = new Date();
  appointId:number = 0; 
  getallAppointment:any[]=[]
  appontObj:any
  popup = false
  
  
  appointmentData(userId:number)
  {
    debugger;
    let date: Date = new Date();
 
       this.service.getAppointmenforPhysician(userId).subscribe( (result)=> {
       this.AppointmentArray = result;
       debugger
       this.AppointmentArray = this.AppointmentArray.filter(d=> new Date(d.appointmentDate).getDate() >= new Date(date).getDate());
      // this.SinglePatientObj=this.AppointmentArray.find(p=> p.appointmentId==this.userId)
      console.log(this.AppointmentArray)
     // this.appontObj = this.AppointmentArray.find(x => x.appointmentId == userId)

      
       
      //this.compaireWeekDay = result.map((x: { appointmentDate: any; }) => new Date(x.appointmentDate));   
      //this.array=this.compaireWeekDay.filter((x: { appointmentDate: any; })=>x.appointmentDate>new Date())
      //this.currentDateTime =(new Date)

       console.log("PMS")
       console.log(this.compaireWeekDay)
       //console.log(this.array)
       this.dataSource = new MatTableDataSource(this.AppointmentArray);
       this.dataSource.sort=this.sort; 
       this.dataSource.paginator = this.paginator;    
    })

  }

  setAppoitmentId(appointmentId : any)
  {
   debugger
    this.appontObj = this.AppointmentArray.find(x => x.appointmentId == appointmentId)
    console.log(this.appontObj)
    
    
  if (confirm("Do you Want to Decline this appointment!")) {
     
           debugger;
           this.service.declineAppointment(appointmentId,"Declined").subscribe((response:any)=> {
               this.notify.success("Status updated Successfully","Success");
               this.route.navigate(['/upcomingappointment'])
               .then(() => {
                 window.location.reload();
               });
           });
    
        } 
  else
        {
          
        }
 
  }

  
  


   

}
