import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



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
export class ReceivedNotesComponent implements OnInit ,AfterViewInit {
  
  displayedColumns: string[] = ['designation', 'sender', 'datetime', 'urgency','message'];
  dataSource = new MatTableDataSource<ReceivedElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  
  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort; 
  }
  
}
