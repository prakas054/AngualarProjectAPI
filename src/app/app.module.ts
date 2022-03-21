import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientModule } from './patient/patient.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { HospitalUsersModule } from './hospital-users/hospital-users.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DisplayPipe } from './admin/diagnosis/display.pipe';






@NgModule({
  declarations: [
    AppComponent,
 
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,    
    UserModule,
    MainLayoutModule,
    AdminModule,
    ScheduleModule,
    PatientModule,
    BrowserAnimationsModule,
    HospitalUsersModule,  
    ToastrModule.forRoot(
      
    )
  ],
  providers: [
    HttpClient,
    DatePipe,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
