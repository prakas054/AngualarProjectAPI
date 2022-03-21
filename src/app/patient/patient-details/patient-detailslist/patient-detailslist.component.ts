import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PatientDetails } from 'src/app/models/patient-detail';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';


@Component({
  selector: 'app-patient-detailslist',
  templateUrl: './patient-detailslist.component.html',
  styleUrls: ['./patient-detailslist.component.css']
})
export class PatientDetailslistComponent implements OnInit {
  
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns = ['title', 'firstName', 'lastName','contactNo','Actions','View'];
  dataSource : any;  
  
  patientDetailsArray :PatientDetails[] =[];
  constructor(private route:Router,private service:PatientDetailsService) { }

  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }

    this.getPatientDetailsList();
  }

  getPatientDetailsList(){
    this.service.getAllPatientDetails().subscribe( (result:PatientDetails[])=> {
         this.patientDetailsArray = result;
         console.log(this.patientDetailsArray);
         this.dataSource = new MatTableDataSource(this.patientDetailsArray);
         this.dataSource.sort=this.sort;
         //this.dataSource.data = this.patientDetailsArray;
         this.dataSource.paginator = this.paginator;
          
    });
 }

 btn_add(){       
  this.route.navigateByUrl('/patientdetails');
}
}
