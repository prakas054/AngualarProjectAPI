import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { PatientDetails } from 'src/app/models/patient-detail';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { BooleanTransformPipe } from '../../boolean-transform.pipe';

import { PatientDetailsViewComponent } from './patient-details-view.component';
let sampleData : any [] = [];
describe('PatientDetailsViewComponent', () => {
  let component: PatientDetailsViewComponent;
  let fixture: ComponentFixture<PatientDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailsViewComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastContainerModule,
        ToastrModule.forRoot()
      ],
      providers: [
        DatePipe,
        BooleanTransformPipe,
        PatientDetailsService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
			return JSON.stringify({"test":"test"});
		});
    fixture = TestBed.createComponent(PatientDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
     
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect( window.localStorage.getItem ).toHaveBeenCalled();
    fixture.detectChanges();
  });

  it('component initial state', ()  => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.getPatientdetails).toBeDefined();
    expect(component.getPatientAllergy).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    fixture.detectChanges();        
    fixture.componentInstance.patientdetails;
    expect(fixture.componentInstance.patientdetails).toEqual(undefined);
  });

  it('set allergy details',() => {
    fixture.detectChanges();        
    fixture.componentInstance.patientallergydetail.push(sampleData[0]);
    expect(fixture.componentInstance.patientallergydetail.length).toEqual(1);
  });

});
