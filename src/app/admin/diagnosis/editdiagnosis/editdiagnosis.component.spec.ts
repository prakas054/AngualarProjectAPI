import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EditdiagnosisComponent } from './editdiagnosis.component';

describe('EditdiagnosisComponent', () => {
  let component: EditdiagnosisComponent;
  let fixture: ComponentFixture<EditdiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdiagnosisComponent ],
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('componenet initial state', ()=> {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBe(true);
    expect(component.form.controls['diagnosisId'].hasError('required')).toBe(true);
    expect(component.form.controls['diagnosisCode'].hasError('required')).toBe(true);
    expect(component.form.controls['diagnosisDescription'].hasError('required')).toBe(true);
    expect(component.form.controls['diagnosisDepriciated'].hasError('required')).toBe(true);    
 });

 it('fields should be empty by default', ()=> {
  expect(component.form.value.diagnosisId).toBe('');
  expect(component.form.value.diagnosisCode).toBe('');
  expect(component.form.value.diagnosisDescription).toBe('');  
});

it('form invalid to be true when form is not valid', ()=> {
  component.form.controls['diagnosisId'].setValue('');
  component.form.controls['diagnosisCode'].setValue('');
  component.form.controls['diagnosisDescription'].setValue('');
  component.form.controls['diagnosisDepriciated'].setValue('');
  expect(component.form.invalid).toBe(true);
});

it('form valid to be true when when form is valid', ()=> {
  component.form.controls['diagnosisId'].setValue('Id');
  component.form.controls['diagnosisCode'].setValue('something');
  component.form.controls['diagnosisDescription'].setValue('something');   
  component.form.controls['diagnosisDepriciated'].setValue('something');
  expect(component.form.invalid).toBeFalse();
});

it('submit button should be disabled if form is invalid', ()=> {
  component.form.controls['diagnosisId'].setValue('');
  component.form.controls['diagnosisCode'].setValue('');
  component.form.controls['diagnosisDescription'].setValue('');
  component.form.controls['diagnosisDepriciated'].setValue('');

  fixture.detectChanges();
  const button = fixture.debugElement.query(By.css("button")); 
  expect(button.nativeElement.disabled).toBeTruthy();
})

it('diagnosis form group Element Count should be 4', ()=> {
  const formElement = fixture.debugElement.nativeElement.querySelector('#form');
  const inputElements = formElement.querySelectorAll('input');
  expect(inputElements.length).toEqual(4);
});
});
