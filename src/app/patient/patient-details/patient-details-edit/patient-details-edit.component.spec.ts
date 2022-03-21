import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { PatientDetailsEditComponent } from './patient-details-edit.component';
const sampleData: any[] = [
  {
    "UserId": 33,
    "Patient_Id": 1,
    "Title": "Mr.",
    "FirstName": "Amit",
    "LastName": "Shinde",
    "EmailId": "amy21690@gmail.com",
    "DOB": "1990-06-21",
    "Age": "30",
    "ContactNo": "9090909090",
    "Gender": "Male",
    "Race": "sacnm",
    "Ethnicity": "jkl",
    "Language": "English",
    "Address": "asdc vnmo",
    "Emergency_Title": "Ms.",
    "Emergency_FirstName": "ascv",
    "Emergency_LastName": "asdcv",
    "Emergency_EmailId": "asdv@mail",
    "Emergency_ContactNo": "9090909090",
    "Emergency_Relation": "Friend",
    "Emergency_Address": "asdcv nmjkl",
    "Allergy_Details": "true"
  }
];
describe('PatientDetailsEditComponent', () => {
  let component: PatientDetailsEditComponent;
  let fixture: ComponentFixture<PatientDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientDetailsEditComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ToastContainerModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('By entering DOB age should be calculated', () => {
    component.patientdetail.value.dob = new Date(1998, 11, 28);
    component.ageCalculator();
    expect(component.age).toBe(23);
  });

  it('componenet initial state', () => {
    expect(component.patientdetail).toBeDefined();
    expect(component.patientdetail.invalid).toBe(true);
    expect(component.patientdetail.controls['title'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['fname'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['lname'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['email'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['gender'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['race'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['ethnicity'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['language'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['address'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['phone'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['etitle'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['efname'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['elname'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['erelation'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['eEmail'].hasError('required')).toBe(true);
    expect(component.patientdetail.controls['ephone'].hasError('required')).toBe(true);
  });

  it('fields should be empty by default', () => {
    expect(component.patientdetail.value.title).toBe('');
    expect(component.patientdetail.value.fname).toBe('');
    expect(component.patientdetail.value.lname).toBe('');
    expect(component.patientdetail.value.email).toBe('');
    expect(component.patientdetail.value.gender).toBe('');
    expect(component.patientdetail.value.race).toBe('');
    expect(component.patientdetail.value.ethnicity).toBe('');
    expect(component.patientdetail.value.language).toBe('');
    expect(component.patientdetail.value.address).toBe('');
    expect(component.patientdetail.value.etitle).toBe('');
    expect(component.patientdetail.value.efname).toBe('');
    expect(component.patientdetail.value.elname).toBe('');
    expect(component.patientdetail.value.erelation).toBe('');
    expect(component.patientdetail.value.eEmail).toBe('');
    expect(component.patientdetail.value.ephone).toBe('');
  });

  it('form invalid to be true when form is not valid', () => {
    component.patientdetail.controls['title'].setValue("");
    component.patientdetail.controls['fname'].setValue("S");
    component.patientdetail.controls['lname'].setValue("");
    component.patientdetail.controls['email'].setValue("test123@mail.com");
    component.patientdetail.controls['dob'].setValue(null);
    component.patientdetail.controls['phone'].setValue("");
    component.patientdetail.controls['gender'].setValue("");
    component.patientdetail.controls['race'].setValue("");
    component.patientdetail.controls['ethnicity'].setValue("");
    component.patientdetail.controls['language'].setValue("");
    component.patientdetail.controls['address'].setValue("");
    component.patientdetail.controls['etitle'].setValue("");
    component.patientdetail.controls['efname'].setValue("");
    component.patientdetail.controls['elname'].setValue("");
    component.patientdetail.controls['erelation'].setValue("");
    component.patientdetail.controls['eEmail'].setValue("");
    component.patientdetail.controls['eaddress'].setValue("");
    component.patientdetail.controls['ephone'].setValue("");
    
    expect(component.patientdetail.invalid).toBe(true);
  });

});
