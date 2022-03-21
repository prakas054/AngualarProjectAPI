import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';

@Component({
  selector: 'app-sentnotes',
  templateUrl: './sentnotes.component.html',
  styleUrls: ['./sentnotes.component.css']
})
export class SentnotesComponent implements OnInit {

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  user:any;
  userdata:any; 
  userId:any;

  //displayedColumns: string[] = ['receiver', 'designation', 'datetime', 'urgency','message'];
  displayedColumns: string[] = ['receiver', 'datetime', 'urgency','message'];
  dataSource:any;
  constructor(private route:Router, private service:NotesService){}

  ngOnInit(): void {
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }

    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;

    this.getList(this.userId);
  }

  getList(id:number){
    this.service.getSentNotes(id).subscribe((result)=> {
      
      this.dataSource = new MatTableDataSource(result);
      console.log(result);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

}
