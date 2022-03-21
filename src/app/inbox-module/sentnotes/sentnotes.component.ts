import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentnotes',
  templateUrl: './sentnotes.component.html',
  styleUrls: ['./sentnotes.component.css']
})
export class SentnotesComponent implements OnInit {
  displayedColumns: string[] = ['receiver', 'designation', 'datetime', 'urgency','message'];
  constructor() { }

  ngOnInit(): void {
  }

}
