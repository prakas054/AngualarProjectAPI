import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVitalsignsComponent } from './patient-vitalsigns.component';

describe('PatientVitalsignsComponent', () => {
  let component: PatientVitalsignsComponent;
  let fixture: ComponentFixture<PatientVitalsignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVitalsignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVitalsignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
