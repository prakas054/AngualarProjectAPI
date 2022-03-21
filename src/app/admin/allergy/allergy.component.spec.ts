import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { AllergyComponent } from './allergy.component';

describe('AllergyComponent', () => {
  let component: AllergyComponent;
  let fixture: ComponentFixture<AllergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyComponent ],
      imports : [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ToastContainerModule,
        ToastrModule.forRoot()    
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('componenet initial state', ()=> {
     expect(component.form).toBeDefined();
     expect(component.form.invalid).toBe(true);
     expect(component.form.controls['allergyCode'].hasError('required')).toBe(true);
     expect(component.form.controls['allergyType'].hasError('required')).toBe(true);
     expect(component.form.controls['allergyName'].hasError('required')).toBe(true);
     expect(component.form.controls['allergyDesc'].hasError('required')).toBeFalsy();
     expect(component.form.controls['allergyClinicalInfo'].hasError('required')).toBe(true);
  });

  it('fields should be empty by default', ()=> {
    expect(component.form.value.allergyCode).toBe('');
    expect(component.form.value.allergyType).toBe('');
    expect(component.form.value.allergyName).toBe('');
    expect(component.form.value.allergyDesc).toBe('');
    expect(component.form.value.allergyClinicalInfo).toBe('');
    expect(component.form.value.allergySource).toBe('');
  });

  it('form invalid to be true when form is not valid', ()=> {
    component.form.controls['allergyCode'].setValue('');
    component.form.controls['allergyType'].setValue('');
    component.form.controls['allergyName'].setValue('');
    component.form.controls['allergyClinicalInfo'].setValue('');
    expect(component.form.invalid).toBe(true);
  });

  it('form valid to be true when when form is valid', ()=> {
    component.form.controls['allergyCode'].setValue('something');
    component.form.controls['allergyType'].setValue('something');
    component.form.controls['allergyName'].setValue('something');
    component.form.controls['allergyClinicalInfo'].setValue('something');
    expect(component.form.invalid).toBeFalse();
  });

  xit('display allergy code error msg when allergy code is blank', ()=> {
    debugger;
    component.form.controls['allergyCode'].setValue('');
    fixture.detectChanges();

    const allergyerror = fixture.nativeElement.querySelector("#allergycode-error-msg");    
    expect(allergyerror).toBeDefined();
    expect(allergyerror.textContent).toContain('Please enter Allergy Code');
  });

  it('submit button should be disabled if form is invalid', ()=> {
    component.form.controls['allergyCode'].setValue('');
    component.form.controls['allergyType'].setValue('');
    component.form.controls['allergyName'].setValue('');
    component.form.controls['allergyClinicalInfo'].setValue('');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    debugger;
    expect(button.nativeElement.disabled).toBeTruthy();
  }) 
});
