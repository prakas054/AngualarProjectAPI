import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientRegComponent } from './patient-reg/patient-reg.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientNavbarComponent } from './patient-navbar/patient-navbar.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PatientVisitdetailsComponent } from './patient-visitdetails/patient-visitdetails.component';
import { VisitdetailsComponent } from './visitdetails/visitdetails.component';
import { PatientDetailslistComponent } from './patient-details/patient-detailslist/patient-detailslist.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { PatientDetailsViewComponent } from './patient-details/patient-details-view/patient-details-view.component';
import { PatientDetailsEditComponent } from './patient-details/patient-details-edit/patient-details-edit.component';
import { PatientAllergyComponent } from './patient-visitdetails/patient-allergy/patient-allergy.component';
import { PatientVitalsignsComponent } from './patient-visitdetails/patient-vitalsigns/patient-vitalsigns.component';
import { PatientDiagnosisComponent } from './patient-visitdetails/patient-diagnosis/patient-diagnosis.component';
import { PatientProcedureComponent } from './patient-visitdetails/patient-procedure/patient-procedure.component';
import { PatientDrugComponent } from './patient-visitdetails/patient-drug/patient-drug.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';  
import { MatToolbarModule} from '@angular/material/toolbar';
import { BooleanTransformPipe } from './boolean-transform.pipe';
import { VisitdetailslistComponent } from './visitdetails/visitdetailslist/visitdetailslist.component';
import { ScheduleModule } from '../schedule/schedule.module';
import { AuthGuardService } from '../Services/auth-guard.service';
//import { ScheduleAppointmentComponent } from '../schedule/schedule-appointment/schedule-appointment.component';



@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientRegComponent,
    PatientNavbarComponent,
    PatientdashboardComponent,
    PatientVisitdetailsComponent,
    VisitdetailsComponent,
    PatientDetailslistComponent,
    PatientDetailsViewComponent,
    PatientDetailsEditComponent,
    PatientAllergyComponent,
    PatientVitalsignsComponent,
    PatientDiagnosisComponent,
    PatientProcedureComponent,
    PatientDrugComponent,
    BooleanTransformPipe,
    VisitdetailsComponent,
    VisitdetailslistComponent,
    //ScheduleAppointmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MainLayoutModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDialogModule,
    MatToolbarModule,
    ScheduleModule,
    RouterModule.forRoot([
      {path: 'patientregister', component:PatientRegComponent},
      {path: 'patientdetails',component:PatientDetailsComponent, canActivate:[AuthGuardService]},
      {path: 'patientdetailslist',component:PatientDetailslistComponent},
      {path: 'patientvisitdetails',component:PatientVisitdetailsComponent},
      {path: 'patientallergydetails',component:PatientAllergyComponent},
      {path: 'patientvitaldetails',component:PatientVitalsignsComponent},
      {path: 'patientdiagnosis',component:PatientDiagnosisComponent},
      {path: 'patientprocedure',component:PatientProcedureComponent},
      {path: 'patientdrug',component:PatientDrugComponent},
      {path: 'patientdetailsedit/:id',component:PatientDetailsEditComponent},
      {path: 'patientdetailsview/:id',component:PatientDetailsViewComponent},
      {path:'patient-navbar',component:PatientNavbarComponent},
      {path:'patient-dashboard',component:PatientdashboardComponent, canActivate:[AuthGuardService]},

      {path:'visit-detail',component:VisitdetailsComponent, canActivate:[AuthGuardService]},
      {path:'visit-details-list/:id',component:VisitdetailslistComponent},
    ]),
  ],
  exports:[
    PatientDetailsComponent,
    PatientRegComponent,
    PatientNavbarComponent,
    PatientdashboardComponent,
    PatientDetailslistComponent,
    PatientDetailsViewComponent,
    PatientDetailsEditComponent,
    PatientAllergyComponent,
    PatientVitalsignsComponent,
    PatientDiagnosisComponent,
    PatientProcedureComponent,
    PatientDrugComponent,
    VisitdetailsComponent,
    VisitdetailslistComponent
  ],
  providers:[
    BooleanTransformPipe
  ]
})
export class PatientModule { }
