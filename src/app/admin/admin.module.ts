import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { Router, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { DrugComponent } from './drug/drug.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AllergyComponent } from './allergy/allergy.component';
import { AllergylistComponent } from './allergy/allergylist/allergylist.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { DruglistComponent } from './drug/druglist/druglist.component';
import { DiagnosislistComponent } from './diagnosis/diagnosislist/diagnosislist.component';
import { EditallergyComponent } from './allergy/editallergy/editallergy.component';
import { EditdrugComponent } from './drug/editdrug/editdrug.component';
import { EditdiagnosisComponent } from './diagnosis/editdiagnosis/editdiagnosis.component';
import { DisplayPipe } from './diagnosis/display.pipe';
import { HospitalusermgmtComponent } from './hospitalusermgmt/hospitalusermgmt.component';
import { UsermgmtfilterPipe } from './usermgmtfilter.pipe';
import { PatientmgmtComponent } from './patientmgmt/patientmgmt.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { ProcedurelistComponent } from './procedure/procedurelist/procedurelist.component';
import { EditprocedureComponent } from './procedure/editprocedure/editprocedure.component';
import { AuthGuardService } from '../Services/auth-guard.service';



@NgModule({
  declarations: [
    AdminNavbarComponent,
    AdmindashboardComponent,
    DrugComponent,
    DiagnosisComponent,
    AllergyComponent,
    AllergylistComponent,
    DisplayPipe,
    DiagnosislistComponent,
    EditallergyComponent,
    DruglistComponent,
    EditdrugComponent,
    EditdiagnosisComponent,
    HospitalusermgmtComponent,
    UsermgmtfilterPipe,
    PatientmgmtComponent,
    ProcedureComponent,
    ProcedurelistComponent,
    EditprocedureComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
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
      {path: 'admin-navbar', component:AdminNavbarComponent},
      {path: 'admin-dashboard', component:AdmindashboardComponent, canActivate: [AuthGuardService]},
      {path: 'admin-drug', component:DrugComponent}, //,pathMatch: 'full',
      {path: 'admin-druglist', component:DruglistComponent,canActivate: [AuthGuardService]},
      {path: 'drugedit/:id', component:EditdrugComponent,},
      {path: 'admin-diagnosis', component:DiagnosisComponent},
      {path: 'admin-diagnosislist', component:DiagnosislistComponent,canActivate: [AuthGuardService]},
      {path: 'diagnosisedit/:id', component:EditdiagnosisComponent},
      {path: 'admin-allergy', component:AllergyComponent},
      {path: 'allergyedit/:id', component:EditallergyComponent},
      {path: 'admin-allergylist', component:AllergylistComponent,canActivate: [AuthGuardService]},
      {path: 'admin-procedure', component:ProcedureComponent}, //,pathMatch: 'full',
      {path: 'admin-procedurelist', component:ProcedurelistComponent,canActivate: [AuthGuardService]},
      {path: 'procedureEdit/:id', component:EditprocedureComponent,},
      {path: 'usermgmt', component:HospitalusermgmtComponent, canActivate:[AuthGuardService]},
      {path: 'patientusermgmt', component:PatientmgmtComponent, canActivate:[AuthGuardService]}
    ])
  ],
  exports : [
    AdminNavbarComponent,
    AdmindashboardComponent,
    DrugComponent,
    DiagnosisComponent,
    AllergyComponent,  
    MatButtonModule,
    MatFormFieldModule,   
    MatRippleModule, 
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    UsermgmtfilterPipe,
    DisplayPipe
  ],
   providers:[
     DisplayPipe,
     UsermgmtfilterPipe
   ]
})
export class AdminModule { }
