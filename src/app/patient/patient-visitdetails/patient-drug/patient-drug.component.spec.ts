import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDrugComponent } from './patient-drug.component';

describe('PatientDrugComponent', () => {
  let component: PatientDrugComponent;
  let fixture: ComponentFixture<PatientDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDrugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
