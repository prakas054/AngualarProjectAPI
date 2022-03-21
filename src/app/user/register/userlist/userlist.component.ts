import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserregService } from 'src/app/Services/userreg.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = ['UserId','Title', 'Name', 'EmailId','EmployeeId','Role',"Actions"];
  dataSource :any; 
  
  userArray :any[] =[];

  constructor(private route:Router,private service:UserregService) { }

  ngOnInit(): void {
   
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }

    this.getUserList();
  } 

  getUserList(){

    this.service.getUserList().subscribe((result)=> {
      debugger;
      this.userArray = result;
      console.log(this.userArray);                  

      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort=this.sort; 
     // this.dataSource.data = this.userArray;
      this.dataSource.paginator = this.paginator;      
    })
  }

  btn_add(){
        this.route.navigateByUrl("/register");
  } 
}



