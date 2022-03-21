import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { DrugComponent } from './drug.component';

describe('DrugComponent', () => {
  let component: DrugComponent;
  let fixture: ComponentFixture<DrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugComponent ],
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
    fixture = TestBed.createComponent(DrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('componet initial state', () => {
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('form group Element Count should be 5', ()=> {
    const formElement = fixture.debugElement.nativeElement.querySelector('#form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(5);
  });

  it('form invalid to be true when form is not valid', ()=> {
    component.form.controls['drugName'].setValue('');
    component.form.controls['drugGenericName'].setValue('');
    component.form.controls['drugManufactureName'].setValue('');
    component.form.controls['drugForm'].setValue('');
    component.form.controls['drugStrength'].setValue('');
    expect(component.form.invalid).toBe(true);
  });

  it('form invalid to be false when form is valid', ()=> {
    component.form.controls['drugName'].setValue('sample value');
    component.form.controls['drugGenericName'].setValue('sample value');
    component.form.controls['drugManufactureName'].setValue('sample value');
    component.form.controls['drugForm'].setValue('sample value');
    component.form.controls['drugStrength'].setValue('sample value');
    expect(component.form.invalid).toBe(false);
  });

  it('submit button should be disabled if form is invalid', ()=> {
    component.form.controls['drugName'].setValue('');
    component.form.controls['drugGenericName'].setValue('');
    component.form.controls['drugManufactureName'].setValue('');
    component.form.controls['drugForm'].setValue('');
    component.form.controls['drugStrength'].setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  }) 

  it('form valid should be true when click on submit', ()=> {
    component.form.controls['drugName'].setValue('sample value');
    component.form.controls['drugGenericName'].setValue('sample value');
    component.form.controls['drugManufactureName'].setValue('sample value');
    component.form.controls['drugForm'].setValue('sample value');
    component.form.controls['drugStrength'].setValue('sample value');

    const btnObj = fixture.nativeElement.querySelector('button');
    btnObj.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(component.form.valid).toBe(true);

  })

});
