import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { diagnosis } from 'src/app/models/diagnosis';
import { DiagnosisService } from 'src/app/Services/diagnosis.service';

@Component({
  selector: 'app-diagnosislist',
  templateUrl: './diagnosislist.component.html',
  styleUrls: ['./diagnosislist.component.css']
})
export class DiagnosislistComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns = ['diagnosis_Code', 'diagnosis_Description', 'diagnosis_Is_Depricated','Actions'];
  dataSource :any;  
  diagnosisArray :diagnosis[] =[];

  constructor(private route:Router,private service:DiagnosisService) {    
    
   }

  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
    
      this.getDiagnosisList();
  }

  getDiagnosisList(){
     this.service.getAllDiagnosis().subscribe( (result:diagnosis[])=> {
          this.diagnosisArray = result;
          console.log(this.diagnosisArray);

          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort=this.sort; 
          //this.dataSource.data = this.diagnosisArray;
          this.dataSource.paginator = this.paginator;
          
     })
  }

  // ngAfterViewInit(): void {
  //   this.dataSource.paginator != this.paginator ;
  //   this.dataSource.sort = this.sort;
  // } 

  
  btn_add(){       
     this.route.navigateByUrl('/admin-diagnosis');
  }

}
