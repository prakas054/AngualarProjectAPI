import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { ForgotpasswordComponent } from './forgotpassword.component';

describe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordComponent ],
      imports:[
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers:[
        HttpClient
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', ()=> {
    expect(component.forgotpwdForm).toBeDefined();
    expect(component.forgotpwdForm.invalid).toBeTruthy();
  });

  it('email should be empty by default', ()=> {
    const strOutput = component.forgotpwdForm.value.email;
    expect(strOutput).toBe('');
  })

  it('Form invalid should be true when form is invalid', ()=> {
    component.forgotpwdForm.controls['email'].setValue('');
    expect(component.forgotpwdForm.invalid).toBe(true);
  })

  it('form invalid should be false when form is valid', ()=> {
    component.forgotpwdForm.controls['email'].setValue('admin@gmail.com');
    expect(component.forgotpwdForm.invalid).toBe(false);
  })

  it('submit button should be disabled if form is invalid', ()=> {
    component.forgotpwdForm.controls['email'].setValue('');

    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  })

  it('submit button should be enables if form is valid', ()=> {
    component.forgotpwdForm.controls['email'].setValue('admin@gmail.com');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  })
});
