import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EditallergyComponent } from './editallergy.component';

describe('EditallergyComponent', () => {
  let component: EditallergyComponent;
  let fixture: ComponentFixture<EditallergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditallergyComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditallergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('componenet initial state', ()=> {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBe(true);
    expect(component.form.controls['allergyId'].hasError('required')).toBe(true);
    expect(component.form.controls['allergyCode'].hasError('required')).toBe(true);
    expect(component.form.controls['allergyType'].hasError('required')).toBe(true);
    expect(component.form.controls['allergyName'].hasError('required')).toBe(true);
    expect(component.form.controls['allergyDesc'].hasError('required')).toBeFalsy();
    expect(component.form.controls['allergyClinicalInfo'].hasError('required')).toBe(true);
   });

   
  it('Test form group Element Count', ()=> {
     const formElement = fixture.debugElement.nativeElement.querySelector('#allergyform');
     const inputElements = formElement.querySelectorAll('input');
     expect(inputElements.length).toEqual(6);
   });

 it('form invalid to be true when form is not valid', ()=> {
  component.form.controls['allergyId'].setValue('');
  component.form.controls['allergyCode'].setValue('');
  component.form.controls['allergyType'].setValue('');
  component.form.controls['allergyName'].setValue('');
  component.form.controls['allergyClinicalInfo'].setValue('');
  expect(component.form.invalid).toBe(true);
});

  it('form valid to be true when when form is valid', ()=> {
    component.form.controls['allergyId'].setValue('1');
    component.form.controls['allergyCode'].setValue('something');
    component.form.controls['allergyType'].setValue('something');
    component.form.controls['allergyName'].setValue('something');
    component.form.controls['allergyClinicalInfo'].setValue('something');
    expect(component.form.invalid).toBeFalse();
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
