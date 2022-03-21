import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';



export interface ReceivedElement {
  designation: string;
  sender: string;
  datetime: any;
  urgency: any;
  message:string
}

const ELEMENT_DATA: ReceivedElement[] = [
  {designation: "Nurse", sender: 'Monica', datetime: '10/11/2021', urgency: 'No',message:"sdfjgdsf"},
  {designation: "Physician", sender: 'BOB', datetime: '10/11/2021', urgency: 'Yes',message:"sdfjgdsf"},
  {designation: "Physician", sender: 'Jason', datetime: '10/11/2021', urgency: 'No',message:"sdfjgdsf"},
  {designation: "Nurse", sender: 'Lyon', datetime: '10/11/2021', urgency: 'yes',message:"sdfjgdsf"},
  {designation: "Nurse", sender: 'Monica', datetime: '10/11/2021', urgency: 'No',message:"sdfjgdsf"},
  {designation: "Physician", sender: 'BOB', datetime: '10/11/2021', urgency: 'Yes',message:"sdfjgdsf"},
  {designation: "Physician", sender: 'Jason', datetime: '10/11/2021', urgency: 'No',message:"sdfjgdsf"},
  {designation: "Nurse", sender: 'Lyon', datetime: '10/11/2021', urgency: 'yes',message:"sdfjgdsf"},
  {designation: "Dr", sender: 'Ranjit', datetime: '11/11/2021', urgency: 'yes',message:"sdfjgdsf"}
];


 @Component({
  selector: 'app-received-notes',
  templateUrl: './received-notes.component.html',
  styleUrls: ['./received-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {
  
  user:any;
  userdata:any; 
  userId:any;

  displayedColumns: string[] = ['sender', 'datetime', 'urgency','message'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  
  constructor(private route:Router,private service:NotesService){}

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
    this.service.getReceivedNotes(id).subscribe((result)=> {
      
      this.dataSource = new MatTableDataSource(result);
      console.log(result);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }
  
}
