import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-navbar',
  templateUrl: './patient-navbar.component.html',
  styleUrls: ['./patient-navbar.component.css']
})
export class PatientNavbarComponent implements OnInit {

  user:any="";
  userdata:any="";
  email:string="";
  userId:number=0; 
  role:string="";
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.email = this.userdata.emailId;
    this.userId = this.userdata.userId;
    this.setRole(this.userdata.roles[0].roleId);
  }
  setRole(roleId : number)
  {
    if(roleId == 2) // role--> Patient
    { 
      this.role = "Patient";
    }
  }
  menu_click(menuId:number){

    if(menuId ==1){
      
      this.router.navigate(["/appointmentlist"]);
    }
    else if(menuId ==2){
      this.router.navigate(["/calendar"]);
    }
    else if(menuId ==3){
      this.router.navigate(['/schedule', ""]);
    }
  }


  logout_click(){
    localStorage.removeItem('PMSUser');
    sessionStorage.removeItem("AUTH_TOKEN");
    this.router.navigate(['/']); 

  }

}
