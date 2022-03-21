import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physician-navbar',
  templateUrl: './physician-navbar.component.html',
  styleUrls: ['./physician-navbar.component.css']
})
export class PhysicianNavbarComponent implements OnInit {

  user:any="";
  userdata:any="";
  email:string="";
  role:string="";
  

  constructor(private route:Router) { }

  ngOnInit(): void {   
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.email = this.userdata.emailId;
    this.setRole(this.userdata.roles[0].roleId);
  }

  setRole(roleId : number)
  {
    if(roleId == 4) // role--> Physician
    { 
      this.role = "Physician";
    }

    else if(roleId == 3)  //// role--> Nurse
    {
      this.role = "Nurse";
    }
    else if(roleId == 2)  //// role--> Patient
    {
      this.role = "Patient";
    }
  }
  menu_click(menuId:number){

    if(menuId ==1){
      
      this.route.navigate(["/send-notes"]);
    }
    else if(menuId ==2){
      this.route.navigate(["/received-notes"]);
    }
    else if(menuId ==3){
      this.route.navigate(["/sentnotes"]);
    }
    else if(menuId ==4){
      this.route.navigate(["/appointmentlist"]);
    }
    else if(menuId ==5){
      window.location.href="/calendar";
    }
    else if(menuId ==6){    
      this.route.navigate(['/schedule', ""]);
    }
    else if(menuId ==7){    
      this.route.navigate(['/upcomingappointment']);
    }
  }

  logout_click(){
    localStorage.removeItem('PMSUser');
    sessionStorage.removeItem('AUTH_TOKEN');
    this.route.navigate(['/']); 
  }
}
