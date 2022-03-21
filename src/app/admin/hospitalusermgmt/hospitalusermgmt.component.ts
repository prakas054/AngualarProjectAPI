import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { updateUserStatus } from 'src/app/models/updateUserStatus';
import { AdminUsermgmtService } from 'src/app/Services/admin-usermgmt.service';
import { UsermgmtfilterPipe } from '../usermgmtfilter.pipe';

@Component({
  selector: 'app-hospitalusermgmt',
  templateUrl: './hospitalusermgmt.component.html',
  styleUrls: ['./hospitalusermgmt.component.css']
})
export class HospitalusermgmtComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = ['EmployeeId','Title', 'Name', 'DOJ','Role',"Status","Actions"];
  dataSource :any; 
  
  userArray :any[] =[]; 
  filteredArray :any[] =[];  
  
  strFiltervalue:any='';
  strFilterkey:any='';

  key:string="";
  value:string="";
  
  constructor(private route:Router,private service:AdminUsermgmtService,
              private filterpipe:UsermgmtfilterPipe, private notify:ToastrService) { }

  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }

    this.getUserList();
  }

  getUserList(){

    this.service.getAdminUserList().subscribe((result)=> {
     
      this.userArray = this.filteredArray = result;
      console.log(this.userArray);                  

      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort=this.sort; 
     // this.dataSource.data = this.userArray;
      this.dataSource.paginator = this.paginator;      
    })
  } 

  search(){ 
    this.filteredArray = this.userArray;
    this.key = this.strFilterkey;
    this.value = this.strFiltervalue;
    this.filteredArray = this.filterpipe.transform(this.userArray,this.key,this.value);

    this.dataSource = new MatTableDataSource(this.filteredArray);
    this.dataSource.sort=this.sort;    
    this.dataSource.paginator = this.paginator;   
  }

  reset(){
    this.key = this.strFilterkey = '';
    this.value = this.strFiltervalue = '';
    this.filteredArray = this.filterpipe.transform(this.userArray,this.key,this.value);

    this.dataSource = new MatTableDataSource(this.filteredArray);
    this.dataSource.sort=this.sort; 
    this.dataSource.paginator = this.paginator;  
  }  

  updatestatus(id:number, status:string){

    debugger;
    let userObj:updateUserStatus = new updateUserStatus();

    userObj.userId = id;
    userObj.status = status;


    this.service.updateUserStatus(userObj).subscribe( (response:any)=> {
         this.notify.success("Status Updated Successfully","Success");
         this.route.navigate(['/usermgmt'])
        .then(() => {
          window.location.reload();
        });
     },(error:HttpErrorResponse)=>{
        this.notify.error(error.error,"Error");
      }
     );
  }
}
