import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastContainerModule,
        ToastrModule.forRoot()
      ],
      providers:[
        HttpClient
      ]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('init state should contain', ()=> {
    expect(component.userRegForm).toBeTruthy();
    expect(component.userRegForm.invalid).toBe(true);
    expect(component.userRegForm.controls['title'].hasError('required')).toBe(true);
    expect(component.userRegForm.controls['firstname'].hasError('required')).toBe(true);
    expect(component.userRegForm.controls['lastname'].hasError('required')).toBe(true);
    expect(component.userRegForm.controls['email'].hasError('required')).toBe(true);
    expect(component.userRegForm.controls['dob'].hasError('required')).toBe(true);
    //expect(component.userRegForm.controls['employeeId'].hasError('required')).toBe(true);
    expect(component.userRegForm.controls['role'].hasError('required')).toBe(true);

  });

  it('fields should be empty by default', ()=> {
    expect(component.userRegForm.value.title).toBe('');
    expect(component.userRegForm.value.firstname).toBe('');
    expect(component.userRegForm.value.lastname).toBe('');
    expect(component.userRegForm.value.email).toBe('');
    //expect(component.userRegForm.value.dob).toBe('');
    expect(component.userRegForm.value.role).toBe('');    
  });

  it('form invalid to be true when form is not valid', ()=> {
    component.userRegForm.controls['title'].setValue('');
    component.userRegForm.controls['firstname'].setValue('');
    component.userRegForm.controls['lastname'].setValue('');
    component.userRegForm.controls['email'].setValue('');
    component.userRegForm.controls['dob'].setValue('');
    component.userRegForm.controls['employeeId'].setValue('');
    component.userRegForm.controls['role'].setValue('');
    expect(component.userRegForm.invalid).toBe(true);
  });

  it('form valid to be true when when form is valid', ()=> {
    component.userRegForm.controls['title'].setValue('Mr.');
    component.userRegForm.controls['firstname'].setValue('Amit');
    component.userRegForm.controls['lastname'].setValue('Shinde');
    component.userRegForm.controls['email'].setValue('amy21690@gmail.com');
    component.userRegForm.controls['dob'].setValue('1990-06-21');
    component.userRegForm.controls['employeeId'].setValue(123);
    component.userRegForm.controls['role'].setValue('Admin');
    expect(component.userRegForm.invalid).toBeFalse();
  });

  xit('submit button should be disabled if form is invalid', ()=> {
    component.userRegForm.controls['title'].setValue('');
    component.userRegForm.controls['firstname'].setValue('');
    component.userRegForm.controls['lastname'].setValue('');
    component.userRegForm.controls['email'].setValue('');
    component.userRegForm.controls['dob'].setValue('');
    component.userRegForm.controls['employeeId'].setValue('');
    component.userRegForm.controls['role'].setValue('');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    debugger;
    expect(button.nativeElement.disabled).toBe(true);
  }) 

});
