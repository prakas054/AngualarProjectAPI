import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  user:any="";
  userdata:any="";
  email:string="";

  constructor(private router:Router) { }

  ngOnInit(): void {   
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.email = this.userdata.emailId;
  }

  menu_click(menuId:number){

    if(menuId == 0){  
      this.router.navigate(['/admin-dashboard']);         
    }
    else if(menuId ==1){  
      this.router.navigate(['/admin-druglist']);
     
    }
    else if(menuId ==2){
      this.router.navigate(['/admin-diagnosislist']);       
    }
    else if(menuId ==3){
      this.router.navigate(['/admin-allergylist']); 
    }
    else if(menuId ==4){
      this.router.navigate(['/userlist']); 
    }
  }

  logout_click(){
    localStorage.removeItem('PMSUser');
    sessionStorage.removeItem("AUTH_TOKEN");
    this.router.navigate(['/']); 
  }
}
