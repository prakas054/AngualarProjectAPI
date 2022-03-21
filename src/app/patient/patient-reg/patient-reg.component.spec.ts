import { HttpClientModule } from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { PatientRegComponent } from './patient-reg.component';

describe('PatientRegComponent', () => {
  let component: PatientRegComponent;
  let fixture: ComponentFixture<PatientRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, 
                FormsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientModule,
                FormsModule,
                ToastContainerModule,
                ToastrModule.forRoot()],
      declarations: [PatientRegComponent],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: Router, useValue: Router },
        // { provide: HttpClient,userValue : HttpClient}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Patient registration form invalid when empty', () => {
    expect(component.patientReg.valid).toBeFalsy();
  });

  it('Title field validation', () => {
    let errors: any = [];
    let title = component.patientReg.controls['title'];
    expect(title.valid).toBeFalsy();

    errors = title.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('First Name field validation', () => {
    let errors: any = [];
    let firstName = component.patientReg.controls['fname'];
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
    let lastName = component.patientReg.controls['lname'];
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
    let email = component.patientReg.controls['email'];
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
    let dob = component.patientReg.controls['dob'];
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

  it('Contact number field validation', () => {
    let errors: any = [];
    let phone = component.patientReg.controls['phone'];
    expect(phone.valid).toBeFalsy();

    errors = phone.errors || null;
    expect(errors['required']).toBeTruthy();

    phone.setValue("909090");
    errors = phone.errors || null;
    expect(errors).toBeTruthy();

    phone.setValue("9090909090");
    errors = phone.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Password field validation', () => {
    let errors: any = [];
    let password = component.patientReg.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || null;
    expect(errors['required']).toBeTruthy();

    password.setValue("Abc12");
    errors = password.errors || null;
    expect(errors).toBeTruthy();

    password.setValue("Abcd1234");
    errors = password.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Confirm Password field validation', () => {
    let errors: any = [];
    let confirmpassword = component.patientReg.controls['confirmpassword'];
    expect(confirmpassword.valid).toBeFalsy();

    errors = confirmpassword.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Result should contain "Passwords do not match. Please re-enter the password" for diffrent passwords', () => {
    component.password = "Abcd1234";
    component.confirmpassword = "Abcd12";
    component.mustMatch();
    const strOutput: string = component.message;
    expect(strOutput).toBe("Passwords do not match. Please re-enter the password");
  });

  it('Result should contain "Please provide all the required values!" if form does not contain one or more required fields', () => {
    component.patientReg.controls['title'].setValue("");
    component.patientReg.controls['fname'].setValue("S");
    component.patientReg.controls['lname'].setValue("");
    component.patientReg.controls['email'].setValue("test123@mail.com");
    component.patientReg.controls['dob'].setValue(null);
    component.patientReg.controls['phone'].setValue("");
    component.patientReg.controls['password'].setValue("Abcd1234");
    component.patientReg.controls['confirmpassword'].setValue("Abcd1234");
    expect(component.patientReg.valid).toBeFalsy();
    component.submitForm();
    const strOutput: string = component.message1;
    expect(strOutput).toBe("Please provide all the required values!");
  });

  it('submit button click generates alert message', () => {
    component.patientReg.controls['title'].setValue("mr");
    component.patientReg.controls['fname'].setValue("Scott");
    component.patientReg.controls['lname'].setValue("Brown");
    component.patientReg.controls['email'].setValue("test123@mail.com");
    component.patientReg.controls['dob'].setValue(2012);
    component.patientReg.controls['phone'].setValue("9090909090");
    component.patientReg.controls['password'].setValue("Abcd1234");
    component.patientReg.controls['confirmpassword'].setValue("Abcd1234");
    expect(component.patientReg.valid).toBeTruthy();
    component.submitForm();
    
    expect(alert).toBeTruthy("Your Data is saved Successfully");
  });


});
