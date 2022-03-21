import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { VisitDetailsService } from 'src/app/Services/visit-details.service';

import { VisitdetailsComponent } from './visitdetails.component';

var sampleData : any [] = [{
  "visit_Id": 2,
  "visit_Date": "2022-02-23T00:00:00",
  "height": "90",
  "weight": "40",
  "blood_Pressure": "56",
  "body_Temperature": "45",
  "respiration_Rate": "45",
  "userId": 26,
}];

describe('VisitdetailsComponent', () => {
  let component: VisitdetailsComponent;
  let fixture: ComponentFixture<VisitdetailsComponent>;
  let mockLocalStorage:{getItem: jasmine.Spy }
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [VisitdetailsComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [
        DatePipe,
        
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
			return JSON.stringify({"test":"test"});
		});
    
    fixture = TestBed.createComponent(VisitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect( window.localStorage.getItem ).toHaveBeenCalled();
  });

  it('component initial state',() => {
    expect(component.visitHistory).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getPateintVisitHistory).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    fixture.detectChanges();        
    fixture.componentInstance.visitHistory.push(sampleData[0]);
    expect(fixture.componentInstance.visitHistory.length).toEqual(1);
  });
});
