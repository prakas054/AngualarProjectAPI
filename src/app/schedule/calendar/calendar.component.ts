import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  user:any="";
  userdata:any="";
  userId: number = 0;
  userRoleId:number = 0;

  popup = false

  constructor(private route:Router,private service:AppointmentService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.userRoleId = this.userdata.roles[0].roleId;

    if(this.userRoleId == 4)
    { 
      debugger;
      console.log("------AppointmentListComponent------physician logon");
      this.service.getAppointmenforPhysician(this.userId).subscribe( (result)=> {
        this.addEvent(result);
     })
    }
    else if(this.userRoleId == 3)
    {
      debugger;
      console.log("------AppointmentListComponent------Nurse logon");  
      this.service.getAppointmenforNurse(this.userId).subscribe( (result)=> {
        this.addEvent(result);
     })
    }

    else if(this.userRoleId == 2)
    {
      debugger;
      console.log("------AppointmentListComponent------Patient logon");  
      this.service.getAppointmenforPatient(this.userId).subscribe( (result)=> {
        this.addEvent(result);
     })
    }
    
    
  }
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.onDateClick.bind(this),
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    
  };

  addEvent(appointments: any) {
    console.log("---calendar---addEvent----appointments-----");
    console.log(appointments);

    appointments.forEach((element:any) => {
      let datearray = element.appointmentDate.split('T');
      let timearray =   this.convertTime(element.appointmentTime);
      let startt = `${datearray[0]}T${timearray[0]}`;
      let endt = `${datearray[0]}T${timearray[1]}`;

      this.Events =  this.Events.concat({
        id : element.appointmentId,
        title : element.title,
        start: startt,
        end: endt,
      });
    });
    console.log("---calendar---addEvent----appointments-----after adding event")
    console.log(this.Events);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      events: this.Events,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        //second: '2-digit',
        meridiem: 'short'
      },
      
      eventClick: (info) => {
        let current_date =  new Date();
        debugger;
        let seleted_event_date = info.event.start
        if(false) /// todo: need to implement
        {
          alert("Not allowed to schedule appointment for this date. please select valid date.")
        }
        else
        {
          this.route.navigate(['/edit', info.event.id])
        }
      },
    }
  }

  convertTime(timeRange : any)
  {
    var r = new Array();
    var t: [] = [];
    t = timeRange.split('to');
    t.forEach((value: string) => {
      r.push(moment(value, ["h:mm A"]).format("HH:mm"));
    });
    return r;
  }

  onDateClick(res: any) {
    console.log("---calendar---onDateClick function----");

    let current_date =  new Date();
    debugger;
    if(current_date> res.date)
    {
      alert("Not allowed to schedule appointment for this date. please select valid date.")
    }
    else
    {
    this.route.navigate(['/schedule', res.dateStr]);
    }
  }
}

