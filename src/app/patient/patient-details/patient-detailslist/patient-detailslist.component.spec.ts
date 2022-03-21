import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientDetails } from 'src/app/models/patient-detail';

import { PatientDetailslistComponent } from './patient-detailslist.component';

describe('PatientDetailslistComponent', () => {
  let component: PatientDetailslistComponent;
  let fixture: ComponentFixture<PatientDetailslistComponent>;
  let PATIENT: PatientDetails[];

  beforeEach(async () => {
    PATIENT = [
      {
        Patient_Id: 18,
        UserId: 26,
        Title: "Mr.",
        FirstName: "Archana",
        LastName: "C A",
        EmailId: "archana@mail.com",
        DOB: new Date(1990-11-11),
        Age:  31,
        ContactNo:"9090909090",
        Gender: "Female",
        Race: "tyukj",
        Ethnicity: "asdcbn",
        Language: "fghbn njmk",
        Address: "asxcd nnjiokmk",
        Emergency_Title: "Mr.",
        Emergency_FirstName:  "Arun",
        Emergency_LastName: "adfcvbm",
        Emergency_EmailId: "asdx@mail",
        Emergency_ContactNo: "1010101010",
        Emergency_Relation: "Father",
        Emergency_Address:  "asxcd nnjiokmk",
        Access_To_Patient_Portal: false,
        Allergy_Details: true,
        Address_Same_As_Patient: true
      },
    ]
    await TestBed.configureTestingModule({
      declarations: [PatientDetailslistComponent],
      imports : [RouterTestingModule, HttpClientModule, MatFormFieldModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.patientDetailsArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getPatientDetailsList).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
      
    fixture.detectChanges();        
    fixture.componentInstance.patientDetailsArray.push(PATIENT[0]);
    expect(fixture.componentInstance.patientDetailsArray.length).toEqual(1);
  })
});
