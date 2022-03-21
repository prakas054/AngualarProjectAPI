import { AfterViewInit, Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AdmindashboardService } from 'src/app/Services/admindashboard.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  
  user:any="";
  userdata:any="";
  email:string="";

  totalusers:number=0;
  totalpatients:number=0;
  totalphysicians:number=0;
  totalnurses:number=0;

  constructor(private route:Router, private service:AdmindashboardService) { }

  ngOnInit(): void {

    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }

    this.getdashboardcount();
  }

  getdashboardcount(){
    debugger;
    this.service.getdashboardcount().subscribe( (result:any)=> {
        this.totalusers = result.totalusers;
        this.totalphysicians = result.totalphysicians;
        this.totalnurses = result.totalnurses;
        this.totalpatients = result.totalpatients;
    })
  }
}
