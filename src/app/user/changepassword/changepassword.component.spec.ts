import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';

import { ChangepasswordComponent } from './changepassword.component';

describe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswordComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,        
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', ()=> {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('fields should be empty by default', ()=> {
    expect(component.form.value.oldpwd).toBe('');
    expect(component.form.value.newpwd).toBe('');
    expect(component.form.value.confirmpwd).toBe('');
  })

  it('Form invalid should be true when form is invalid', ()=> {
    component.form.controls['oldpwd'].setValue('');
    component.form.controls['newpwd'].setValue('');
    component.form.controls['confirmpwd'].setValue('');
    expect(component.form.invalid).toBe(true);
  })

  it('submit button should be disabled if form is invalid', ()=> {
    component.form.controls['oldpwd'].setValue('');
    component.form.controls['newpwd'].setValue('');
    component.form.controls['confirmpwd'].setValue('');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  }) 

  it('new password and confirm password should be equal', ()=> {
    
    component.form.controls['newpwd'].setValue('Admin@321#');
    component.form.controls['confirmpwd'].setValue('Admin@321#');
    fixture.detectChanges();
    expect(component.form.value.newpwd).toEqual(component.form.value.confirmpwd)
  })
});
