import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { EditprocedureComponent } from './editprocedure.component';

describe('EditprocedureComponent', () => {
  let component: EditprocedureComponent;
  let fixture: ComponentFixture<EditprocedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprocedureComponent ],
      imports:[
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,       
        ToastrModule.forRoot()    
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprocedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('componenet initial state', ()=> {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBe(true);
    expect(component.form.controls['procedureCode'].hasError('required')).toBe(true);
    expect(component.form.controls['procedureDescription'].hasError('required')).toBe(true);    
 });

 it('form group Element Count should be 4', ()=> {
  const formElement = fixture.debugElement.nativeElement.querySelector('#form');
  const inputElements = formElement.querySelectorAll('input');
  expect(inputElements.length).toEqual(4);
});

 it('fields should be empty by default', ()=> {
   expect(component.form.value.procedureCode).toBe('');
   expect(component.form.value.procedureDescription).toBe('');
   expect(component.form.value.procedureDepricated).toBe('yes');    
 });

 it('form invalid to be true when form is not valid', ()=> {
   component.form.controls['procedureCode'].setValue('');
   component.form.controls['procedureDescription'].setValue('');   
   expect(component.form.invalid).toBe(true);
 });

 it('form valid to be true when when form is valid', ()=> {
   component.form.controls['procedureCode'].setValue('something');
   component.form.controls['procedureDescription'].setValue('something');    
   expect(component.form.invalid).toBeFalse();
 });


 it('submit button should be disabled if form is invalid', ()=> {
   component.form.controls['procedureCode'].setValue('');
   component.form.controls['procedureDescription'].setValue('');    

   fixture.detectChanges();
   const button = fixture.debugElement.query(By.css("button"));
   debugger;
   expect(button.nativeElement.disabled).toBeTruthy();
 }) 

});
