import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { UsermgmtfilterPipe } from '../usermgmtfilter.pipe';

import { PatientmgmtComponent } from './patientmgmt.component';

describe('PatientmgmtComponent', () => {
  let component: PatientmgmtComponent;
  let fixture: ComponentFixture<PatientmgmtComponent>;
  let USERS: { UserId: number; Title: string; Name: string; FirstName: string; LastName: string; EmailId: string; EmployeeId: number; DOB: string; DOJ: string; Status: string; Role: string; }[];

  beforeEach(async () => {

    USERS = [
      { UserId: 1, Title: 'Mr.', Name: "Amit Shinde",FirstName:"Amit", LastName :"Shinde", EmailId :"amy21690@gmail.com", EmployeeId:111,DOB:"1990-06-21",DOJ :"2022-03-12",Status:"Active",Role:"Patient" },
      { UserId: 2, Title: 'Ms.', Name: "Achyutha A",FirstName:"Achyutha", LastName :"A", EmailId :"achyutha@gmail.com", EmployeeId:222,DOB:"1990-06-21",DOJ :"2022-03-12",Status:"Active",Role:"Patient" },
      { UserId: 3, Title: 'Mr.', Name: "Vikram Rathod",FirstName:"Vikram", LastName :"Rathod", EmailId :"vikram@gmail.com", EmployeeId:333,DOB:"1990-06-21",DOJ :"2022-03-12",Status:"Active",Role:"Patient" }       
     ]

    await TestBed.configureTestingModule({
      declarations: [ PatientmgmtComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),        
      ],
      providers:[
        UsermgmtfilterPipe
      ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.userArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getUserList).toBeDefined();
  });

  it('should set patients correctly from the service', () => {
    debugger;
    //mockuserService.getUsers.and.returnValue(of(USERS));
    fixture.detectChanges();
    fixture.componentInstance.userArray.push(USERS[0]);
    fixture.componentInstance.userArray.push(USERS[1]);
    fixture.componentInstance.userArray.push(USERS[2]);
    expect(fixture.componentInstance.userArray.length).toBe(3);
  })
});
