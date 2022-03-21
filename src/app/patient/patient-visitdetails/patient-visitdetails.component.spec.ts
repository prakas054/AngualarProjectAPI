import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { PatientVisitdetailsComponent } from './patient-visitdetails.component';

describe('PatientVisitdetailsComponent', () => {
  let component: PatientVisitdetailsComponent;
  let fixture: ComponentFixture<PatientVisitdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
                ReactiveFormsModule, 
                FormsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                HttpClientModule,
                FormsModule,
                ToastContainerModule,
                ToastrModule.forRoot()
      ],
      declarations: [ PatientVisitdetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRoute },
        { provide: Router, useValue: Router },
        {provide:FormBuilder},
        { provide: HttpClient,userValue : HttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });

  it('Height field validation', () => {
    let errors: any = [];
    let height = component.patientvisitdetail.controls['height'];
    expect(height.valid).toBeFalsy();

    errors = height.errors || null;
    expect(errors['required']).toBeTruthy();

    height.setValue(251);
    errors = height.errors || null;
    expect(errors).toBeTruthy();

    height.setValue(45);
    errors = height.errors || null;
    expect(errors).toBeFalsy();
  });

  it('Bodytemperature field validation', () => {
    let errors: any = [];
    let bodytemperature = component.patientvisitdetail.controls['height'];
    expect(bodytemperature.valid).toBeFalsy();

    errors = bodytemperature.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Weight field validation', () => {
    let errors: any = [];
    let weight = component.patientvisitdetail.controls['weight'];
    expect(weight.valid).toBeFalsy();

    errors = weight.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Respirationrate field validation', () => {
    let errors: any = [];
    let respirationrate = component.patientvisitdetail.controls['respirationrate'];
    expect(respirationrate.valid).toBeFalsy();

    errors = respirationrate.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Bloodpressure field validation', () => {
    let errors: any = [];
    let bloodpressure = component.patientvisitdetail.controls['bloodpressure'];
    expect(bloodpressure.valid).toBeFalsy();

    errors = bloodpressure.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Diagnosis code field validation', () => {
    let errors: any = [];
    let diagnosiscode = component.patientvisitdetail.controls['diagnosiscode'];
    expect(diagnosiscode.valid).toBeFalsy();

    errors = diagnosiscode.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Diagnosis depriciated  field validation', () => {
    let errors: any = [];
    let diagnosisdepriciated = component.patientvisitdetail.controls['diagnosisdepriciated'];
    expect(diagnosisdepriciated.valid).toBeFalsy();

    errors = diagnosisdepriciated.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Procedure code  field validation', () => {
    let errors: any = [];
    let procedurecode = component.patientvisitdetail.controls['procedurecode'];
    expect(procedurecode.valid).toBeFalsy();

    errors = procedurecode.errors || null;
    expect(errors['required']).toBeTruthy();
  });

  it('Procedure is depriciated field validation', () => {
    let errors: any = [];
    let procedureisdepriciated = component.patientvisitdetail.controls['procedureisdepriciated'];
    expect(procedureisdepriciated.valid).toBeFalsy();

    errors = procedureisdepriciated.errors || null;
    expect(errors['required']).toBeTruthy();
  });
  it('Result should contain "The form contains one or more missing values" if form does not contain one or more required fields', () => {
    component.patientvisitdetail.controls['height'].setValue(251);
    component.patientvisitdetail.controls['bodytemperature'].setValue(45);
    component.patientvisitdetail.controls['weight'].setValue(null);
    component.patientvisitdetail.controls['respirationrate'].setValue(67);
    component.patientvisitdetail.controls['bloodpressure'].setValue(null);
    component.patientvisitdetail.controls['diagnosiscode'].setValue("");
    component.patientvisitdetail.controls['diagnosisdepriciated'].setValue("");
    component.patientvisitdetail.controls['procedurecode'].setValue("");
    component.patientvisitdetail.controls['procedureisdepriciated'].setValue("");
    expect(component.patientvisitdetail.valid).toBeFalsy();
    component.submitForm();
    const strOutput: string = component.message;
    expect(strOutput).toBe("The form contains one or more missing values");
  });

});
