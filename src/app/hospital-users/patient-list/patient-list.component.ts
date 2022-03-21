import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientRegService } from 'src/app/Services/patient-reg.service';
import { PatientReg } from 'src/app/models/patient-reg';
import { MatTableDataSource } from '@angular/material/table';
import { UsermgmtfilterPipe } from 'src/app/admin/usermgmtfilter.pipe';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns:string[] = ['Id','Name', 'Email',  'DOB','DOJ'];
  dataSource :any; 
  userArray :any[] =[]; 
  filteredArray :any[] =[];  
  
  strFiltervalue:any='';
  strFilterkey:any='';

  key:string="";
  value:string="";

  constructor(private route:Router,private service:PatientRegService,private filterpipe:UsermgmtfilterPipe) { }

  ngOnInit(): void {
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }
  
    this.getPatientList();
    
  }

  AllPatientArray :PatientReg[] =[];

  getPatientList(){

        this.service.getAllPatient().subscribe((result)=> {
          
            this.AllPatientArray = result;
            console.log(this.AllPatientArray);  
                         

          this.dataSource = new MatTableDataSource(this.AllPatientArray);
          this.dataSource.sort=this.sort; 
          this.dataSource.paginator = this.paginator;      
        })
  }



      btn_add(){       
        this.route.navigateByUrl('/patientreg');
    }

    search(){
          this.filteredArray = this.AllPatientArray;
      
          if(this.strFilterkey == 'patientId'){
            this.strFilterkey='employeeId';
          }
      
          this.key = this.strFilterkey;
          this.value = this.strFiltervalue;
          this.filteredArray = this.filterpipe.transform(this.AllPatientArray,this.key,this.value);
      
          this.dataSource = new MatTableDataSource(this.filteredArray);
          this.dataSource.sort=this.sort;    
          this.dataSource.paginator = this.paginator; 
    }
    reset(){
          this.key = this.strFilterkey = '';
          this.value = this.strFiltervalue = '';
          this.filteredArray = this.filterpipe.transform(this.AllPatientArray,this.key,this.value);
      
          this.dataSource = new MatTableDataSource(this.filteredArray);
          this.dataSource.sort=this.sort; 
          this.dataSource.paginator = this.paginator;  
    }  
}
