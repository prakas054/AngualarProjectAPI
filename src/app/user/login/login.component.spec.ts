import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/Services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastContainerModule, ToastrModule, ToastrService } from 'ngx-toastr';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],     
      imports:[       
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule, 
        ToastContainerModule,
        ToastrModule.forRoot()             
      ],      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  }); 

  it('compoenet initial state', ()=> {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.invalid).toBeTruthy();
  });

  it('email should be empty as default value',()=> {    
    const Output :string = component.loginForm.value.email;
    expect(Output).toBe('');
  });

  it('password should be empty as default value', ()=> {
    const Output:string = component.loginForm.value.password;
    expect(Output).toBe('');
  });

  it('Form invalid should be true when form is invalid', ()=> {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['email'].setValue('');
    expect(component.loginForm.invalid).toBe(true);
  });

  it('display email required error msg when email is blank', ()=> {
   component.loginForm.controls['email'].setValue('');
   fixture.detectChanges();
   const emailerror = fixture.debugElement.nativeElement.querySelector('#email-error-msg');
   expect(emailerror).toBeDefined();   
  });
});
