import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { PhysiciandashComponent } from './physiciandash/physiciandash.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AuthGuardService } from '../Services/auth-guard.service';
import { DatePipe } from '@angular/common';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    ScheduleAppointmentComponent,
    PhysiciandashComponent,
    AppointmentListComponent,
    CalendarComponent,
    AppointmentEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainLayoutModule,
    MainLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,   
    MatRippleModule, 
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,    
    RouterModule.forChild([  
      {path: 'schedule/:appoiDatestr', component:ScheduleAppointmentComponent,canActivate:[AuthGuardService]},
      {path: 'appointmentlist', component:AppointmentListComponent, canActivate:[AuthGuardService]},
      {path: 'calendar', component:CalendarComponent, canActivate:[AuthGuardService]},
      {path: 'edit/:appointmentId', component:AppointmentEditComponent}
    ]),
    FullCalendarModule, // register FullCalendar with you app
  ],
  providers: [
    DatePipe 
   ],
  exports:[
    ScheduleAppointmentComponent
  ]
})
export class ScheduleModule { }
