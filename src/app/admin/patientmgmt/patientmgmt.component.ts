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
  selector: 'app-patientmgmt',
  templateUrl: './patientmgmt.component.html',
  styleUrls: ['./patientmgmt.component.css']
})
export class PatientmgmtComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = ['EmployeeId','Title','Name','CreatedOn','Role','Status','Actions'];
  dataSource:any;

  userArray :any[] =[]; 
  filteredArray :any[] =[];  
  
  strFiltervalue:any='';
  strFilterkey:any='';

  key:string="";
  value:string="";

  constructor(private route:Router, private service:AdminUsermgmtService,
              private notify:ToastrService,private filterpipe:UsermgmtfilterPipe) { }

  ngOnInit(): void {

    // if(localStorage.getItem("PMSUser") == null){
    //      this.route.navigateByUrl('/');
    // }

    this.getUserList();
  }

  getUserList(){
      this.service.getPatientUserList().subscribe( (result:any)=> {
        this.filteredArray = this.userArray = result;

        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  search(){
    this.filteredArray = this.userArray;

    if(this.strFilterkey == 'patientId'){
      this.strFilterkey='employeeId';
    }

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
         this.route.navigate(['/patientusermgmt'])
        .then(() => {
          window.location.reload();
        });
     },(error:HttpErrorResponse)=>{
        this.notify.error(error.error,"Error");
      }
     );
  }

}
