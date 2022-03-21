import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure';
import { ProcedureService } from 'src/app/Services/procedure.service';

@Component({
  selector: 'app-procedurelist',
  templateUrl: './procedurelist.component.html',
  styleUrls: ['./procedurelist.component.css']
})
export class ProcedurelistComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns = ['procedure_Code', 'procedure_Description', 'procedure_Is_Depricated','Actions'];
  dataSource :any;

  
  procedureArray :Procedure[] =[];

  constructor(private route:Router,private service:ProcedureService) { }

  ngOnInit(): void {

    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
    
      this.getProcedureList();
  }

  getProcedureList(){
    this.service.getProcedurList().subscribe( (result:Procedure[])=> {
         this.procedureArray = result;
         console.log(this.procedureArray);

         this.dataSource = new MatTableDataSource(result);
         this.dataSource.sort=this.sort; 
         //this.dataSource.data = this.diagnosisArray;
         this.dataSource.paginator = this.paginator;
         
    })
 }

 btn_add(){       
  this.route.navigateByUrl('/admin-procedure');
}

}
