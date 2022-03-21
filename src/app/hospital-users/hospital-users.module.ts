import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicianDashboardComponent } from './physician-dashboard/physician-dashboard.component';
import { PhysicianNavbarComponent } from './physician-dashboard/physician-navbar/physician-navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { SendNotesComponent } from './send-notes/send-notes.component';
import { ReceivedNotesComponent } from './received-notes/received-notes.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SentnotesComponent } from './sentnotes/sentnotes.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ScheduleModule } from '../schedule/schedule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientRegComponent } from './patient-reg/patient-reg.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { UsermgmtfilterPipe } from '../admin/usermgmtfilter.pipe';
import { MatTabsModule } from '@angular/material/tabs';


import { IsdepricatedPipe } from './patient-visit/isdepricated.pipe';
import { AdminModule } from '../admin/admin.module';
import { PatientVisitHistoryComponent } from './patient-visit-history/patient-visit-history.component';
import { PatientVisitDetailsComponent } from './patient-visit-history/patient-visit-details/patient-visit-details.component';
import { UpcomingappointmentComponent } from './upcomingappointment/upcomingappointment.component';
import { ColordirectiveDirective } from './upcomingappointment/colordirective.directive';
import { AuthGuardService } from '../Services/auth-guard.service';




@NgModule({
  declarations: [
    PhysicianDashboardComponent,
    PhysicianNavbarComponent,
    SendNotesComponent,
    ReceivedNotesComponent,
    SentnotesComponent,
    PatientVisitComponent,
    PatientRegComponent,
    PatientListComponent,

    IsdepricatedPipe,
      PatientVisitHistoryComponent,
      PatientVisitDetailsComponent,
      UpcomingappointmentComponent,
      ColordirectiveDirective
   
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MainLayoutModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MainLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    ScheduleModule,   
    AdminModule,
    RouterModule.forChild([  
      {path: 'physician-dashboard', component:PhysicianDashboardComponent, canActivate:[AuthGuardService]},
      {path: 'physician-navbar', component:PhysicianNavbarComponent},
      {path: 'send-notes', component:SendNotesComponent,canActivate:[AuthGuardService]},
      {path: 'received-notes', component:ReceivedNotesComponent,canActivate:[AuthGuardService]},
      {path: 'sentnotes', component:SentnotesComponent,canActivate:[AuthGuardService]},
      {path: 'patient-visit', component:PatientVisitComponent,canActivate:[AuthGuardService]},
      {path: 'patientlist', component:PatientListComponent,canActivate:[AuthGuardService]},
      {path: 'patientreg', component:PatientRegComponent,canActivate:[AuthGuardService]},
      {path: 'patientvisithistory', component:PatientVisitHistoryComponent,canActivate:[AuthGuardService]},
      {path: 'perticularPatientDetails/:id', component:PatientVisitDetailsComponent},
       {path: 'upcomingappointment', component:UpcomingappointmentComponent,canActivate:[AuthGuardService]},

    ])
  ],
  providers: [
    UsermgmtfilterPipe,
    IsdepricatedPipe],
  exports: [SendNotesComponent, ReceivedNotesComponent, SentnotesComponent,PatientListComponent,PhysicianDashboardComponent,
    PhysicianNavbarComponent,PatientVisitComponent,PatientRegComponent,PatientVisitHistoryComponent,PatientVisitDetailsComponent,UpcomingappointmentComponent]
})
export class HospitalUsersModule { }
