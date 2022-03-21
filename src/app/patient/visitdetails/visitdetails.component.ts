import { Component, OnInit } from '@angular/core';
import { VisitDetailsService } from 'src/app/Services/visit-details.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-visitdetails',
  templateUrl: './visitdetails.component.html',
  styleUrls: ['./visitdetails.component.css']
})
export class VisitdetailsComponent implements OnInit {

  visitHistory: any[] = [];

  sortedData: any[] = [];

  user: any = "";
  userdata: any = "";
  email: string = "";
  userId: number = 0;
  userName: string = "";
  constructor(private visitservice: VisitDetailsService) {

  }

  ngOnInit(): void {
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;
    this.email = this.userdata.emailId;
    this.userName = this.userdata.firstName;

    this.getPateintVisitHistory(this.userId);
    this.sortedData = this.visitHistory;
  }

  getPateintVisitHistory(id: number) {   
    this.visitservice.getPatientVisitList(id).subscribe((response) => {
      debugger
      this.visitHistory = response;
      console.log(this.visitHistory);
    });
  }

  sortData(sort: Sort) {
    debugger
    const data = this.visitHistory;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'visit_Id':
          return compare(a.visit_Id, b.visit_Id, isAsc);
        case 'userName':
          return compare(a.userName, b.userName, isAsc);
        case 'height':
          return compare(a.height, b.height, isAsc);
        case 'weight':
          return compare(a.weight, b.weight, isAsc);
        case 'visit_Date':
          return compare(a.visit_Date, b.visit_Date, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
