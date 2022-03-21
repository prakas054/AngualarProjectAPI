import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AllergyService } from 'src/app/Services/allergy.service';
import { Allergy } from 'src/app/models/allergy';

@Component({
  selector: 'app-allergylist',
  templateUrl: './allergylist.component.html',
  styleUrls: ['./allergylist.component.css']
})
export class AllergylistComponent implements OnInit {
  
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns = ['allergy_Code', 'allergy_Type', 'allergy_Name', 'allergy_Clinical_Information',"Actions"];
  dataSource :any;
  
  allrgyArray :Allergy[] =[];

  constructor(private route:Router,private service:AllergyService) {    
    
   }

  ngOnInit(): void {

    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
    
      this.getAllergyList();
  }

  getAllergyList(){
     this.service.getAllAllergy().subscribe( (result:Allergy[])=> {
          debugger;

          this.allrgyArray = result;
          console.log(this.allrgyArray);                  

          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort=this.sort;
          //this.dataSource.data = this.allrgyArray;
          this.dataSource.paginator = this.paginator;           
     })
  }

  btn_add(){       
     this.route.navigateByUrl('/admin-allergy');
  }
}


