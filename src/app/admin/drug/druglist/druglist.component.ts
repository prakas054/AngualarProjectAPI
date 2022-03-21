import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { DrugService } from 'src/app/Services/drug.service';
import { drug } from 'src/app/models/drug';

@Component({
  selector: 'app-druglist',
  templateUrl: './druglist.component.html',
  styleUrls: ['./druglist.component.css']
})
export class DruglistComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns = ['drug_Name', 'drug_Generic_Name', 'drug_Manufacture_Name', 'drug_Strength', 'drug_Form','Actions'];
  dataSource :any;

  drugArray: drug[] = [];

  constructor(private route: Router, private service: DrugService) { }

  ngOnInit(): void {
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
    this.getDrugList();
  }

  getDrugList(){
     this.service.getAllDrugs().subscribe( (result:drug[])=> {
          debugger;

          this.drugArray = result;
          console.log(this.drugArray);                  

          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort=this.sort; 
          //this.dataSource.data = this.drugArray;
          this.dataSource.paginator = this.paginator;          
     });
  }

  btn_add() {
    this.route.navigateByUrl('/admin-drug');
  }
}



