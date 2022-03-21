import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutModule } from '../main-layout/main-layout.module';
import { AdminModule } from '../admin/admin.module';
import { UserlistComponent } from './register/userlist/userlist.component';
import { EdituserComponent } from './register/edituser/edituser.component';
import { AuthGuardService } from '../Services/auth-guard.service';




@NgModule({
  declarations: [
    LoginComponent,
    ForgotpasswordComponent,
    RegisterComponent,
    ChangepasswordComponent,
    UserlistComponent,
    EdituserComponent,       
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainLayoutModule,
    AdminModule,  
    RouterModule.forChild([
      {path: '', component:LoginComponent},
      {path: 'forgotpwd', component:ForgotpasswordComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'changepwd/:email', component:ChangepasswordComponent},  
      {path: 'userlist', component:UserlistComponent, canActivate:[AuthGuardService]},  
      {path: 'register', component:RegisterComponent},
      {path: 'edituser/:id', component:EdituserComponent},      
    ]),
    
  ],
  exports: [
    LoginComponent,
    ForgotpasswordComponent,
    RegisterComponent,
    ChangepasswordComponent
  ],
})
export class UserModule { }
