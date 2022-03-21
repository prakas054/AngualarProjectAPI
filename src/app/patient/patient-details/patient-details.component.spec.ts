import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { elementAt } from 'rxjs';
import { BooleanTransformPipe } from '../boolean-transform.pipe';



import { PatientDetailsComponent } from './patient-details.component';

describe('PatientDetailsComponent', () => {
  let component: PatientDetailsComponent;
  let fixture: ComponentFixture<PatientDetailsComponent>;
  
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [PatientDetailsComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastContainerModule,
        ToastrModule.forRoot()
      ],
      providers: [
        DatePipe,
        BooleanTransformPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
			return JSON.stringify({"test":"test"});
		});
    fixture = TestBed.createComponent(PatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect( window.localStorage.getItem ).toHaveBeenCalled();
  });

  it('Patient details form invalid when empty', () => {
    expect(component.patientdetail.valid).toBeFalsy();
  });

  it('Title field validation', () => {
    let errors: any = [];
    let title = component.patientdetail.controls['title'];
    expect(title.valid).toBeFalsy();

    errors = title.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('First Name field validation', () => {
    let errors: any = [];
    let firstName = component.patientdetail.controls['fname'];
    expect(firstName.valid).toBeFalsy();

    errors = firstName.errors || null;
    expect(errors['required']).toBeTruthy();

    firstName.setValue("T");
    errors = firstName.errors || null;
    expect(errors).toBeTruthy();

    firstName.setValue("Scott");
    errors = firstName.errors || null;
    expect(errors).toBeFalsy();
  });
  it('Last Name field validation', () => {
    let errors: any = [];
    let lastName = component.patientdetail.controls['lname'];
    expect(lastName.valid).toBeFalsy();

    errors = lastName.errors || null;
    expect(errors['required']).toBeTruthy();

    lastName.setValue("T");
    errors = lastName.errors || null;
    expect(errors).toBeTruthy();

    lastName.setValue("Brown");
    errors = lastName.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Email field validation', () => {
    let errors: any = [];
    let email = component.patientdetail.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || null;
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || null;
    expect(errors).toBeTruthy();

    email.setValue("test123@mail.com");
    errors = email.errors || null;
    expect(errors).toBeFalsy();
  });

  it('DOB field validation', () => {
    let errors: any = [];
    let dob = component.patientdetail.controls['dob'];
    expect(dob.valid).toBeFalsy();

    errors = dob.errors || null;
    expect(errors['required']).toBeTruthy();

    dob.setValue(2022);
    errors = dob.errors || null;
    expect(errors).toBeTruthy();

    dob.setValue(1998);
    errors = dob.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Gender field validation', () => {
    let errors: any = [];
    let gender = component.patientdetail.controls['gender'];
    expect(gender.valid).toBeFalsy();

    errors = gender.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Race field validation', () => {
    let errors: any = [];
    let race = component.patientdetail.controls['race'];
    expect(race.valid).toBeFalsy();

    errors = race.errors || null;
    expect(errors['required']).toBeTruthy();

    race.setValue("E");
    errors = race.errors || null;
    expect(errors).toBeTruthy();

    race.setValue("Asian");
    errors = race.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Ethnicity field validation', () => {
    let errors: any = [];
    let ethnicity = component.patientdetail.controls['ethnicity'];
    expect(ethnicity.valid).toBeFalsy();

    errors = ethnicity.errors || null;
    expect(errors['required']).toBeTruthy();

    ethnicity.setValue("A");
    errors = ethnicity.errors || null;
    expect(errors).toBeTruthy();

    ethnicity.setValue("Asian");
    errors = ethnicity.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Language field validation', () => {
    let errors: any = [];
    let language = component.patientdetail.controls['language'];
    expect(language.valid).toBeFalsy();

    errors = language.errors || null;
    expect(errors['required']).toBeTruthy();

    language.setValue("E");
    errors = language.errors || null;
    expect(errors).toBeTruthy();

    language.setValue("English");
    errors = language.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Address field validation', () => {
    let errors: any = [];
    let address = component.patientdetail.controls['address'];
    expect(address.valid).toBeFalsy();

    errors = address.errors || null;
    expect(errors['required']).toBeTruthy();

    address.setValue("E");
    errors = address.errors || null;
    expect(errors).toBeTruthy();

    address.setValue("Near old tank bund road Bangalore-562101");
    errors = address.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Contact number field validation', () => {
    let errors: any = [];
    let phone = component.patientdetail.controls['phone'];
    expect(phone.valid).toBeFalsy();

    errors = phone.errors || null;
    expect(errors['required']).toBeTruthy();

    phone.setValue("90909");
    errors = phone.errors || null;
    expect(errors).toBeTruthy();

    phone.setValue("9090909090");
    errors = phone.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Emergency contact info Title field validation', () => {
    let errors: any = [];
    let etitle = component.patientdetail.controls['etitle'];
    expect(etitle.valid).toBeFalsy();

    errors = etitle.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Emergency contact info  First Name field validation', () => {
    let errors: any = [];
    let efname = component.patientdetail.controls['efname'];
    expect(efname.valid).toBeFalsy();

    errors = efname.errors || null;
    expect(errors['required']).toBeTruthy();

    efname.setValue("T");
    errors = efname.errors || null;
    expect(errors).toBeTruthy();

    efname.setValue("Scott");
    errors = efname.errors || null;
    expect(errors).toBeFalsy();
  });
  it('Emergency contact info  Last Name field validation', () => {
    let errors: any = [];
    let elname = component.patientdetail.controls['elname'];
    expect(elname.valid).toBeFalsy();

    errors = elname.errors || null;
    expect(errors['required']).toBeTruthy();

    elname.setValue("T");
    errors = elname.errors || null;
    expect(errors).toBeTruthy();

    elname.setValue("Brown");
    errors = elname.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Emergency contact info Relation field validation', () => {
    let errors: any = [];
    let erelation = component.patientdetail.controls['erelation'];
    expect(erelation.valid).toBeFalsy();

    errors = erelation.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Emergency contact info Email field validation', () => {
    let errors: any = [];
    let eEmail = component.patientdetail.controls['eEmail'];
    expect(eEmail.valid).toBeFalsy();

    errors = eEmail.errors || null;
    expect(errors['required']).toBeTruthy();

    eEmail.setValue("test");
    errors = eEmail.errors || null;
    expect(errors).toBeTruthy();

    eEmail.setValue("test123@mail.com");
    errors = eEmail.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Emergency contact info Address field validation', () => {
    let errors: any = [];
    let eaddress = component.patientdetail.controls['eaddress'];
    expect(eaddress.valid).toBeFalsy();

    errors = eaddress.errors || null;
    expect(errors['required']).toBeTruthy();

    eaddress.setValue("E");
    errors = eaddress.errors || null;
    expect(errors).toBeTruthy();

    eaddress.setValue("Near old tank bund road Bangalore-562101");
    errors = eaddress.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Emergency contact info Contact number field validation', () => {
    let errors: any = [];
    let ephone = component.patientdetail.controls['ephone'];
    expect(ephone.valid).toBeFalsy();

    errors = ephone.errors || null;
    expect(errors['required']).toBeTruthy();

    ephone.setValue("90909");
    errors = ephone.errors || null;
    expect(errors).toBeTruthy();

    ephone.setValue("9090909090");
    errors = ephone.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Allergy details selection validation', () => {
    let errors: any = [];
    let isVisible = component.patientdetail.controls['isVisible'];
    expect(isVisible.valid).toBeFalsy();

    errors = isVisible.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Result should contain "The form contains one or more missing values" if form does not contain one or more required fields', () => {
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
    component.patientdetail.controls['isVisible'].setValue("");
    expect(component.patientdetail.valid).toBeFalsy();
    component.submitForm();
    const strOutput: string = component.message;
    expect(strOutput).toBe("The form contains one or more missing values");
  });

  it('By entering DOB age should be calculated', () => {
    component.patientdetail.value.dob = new Date(1998, 11, 28);
    component.ageCalculator();
    expect(component.age).toBe(23);
  });

  
});
