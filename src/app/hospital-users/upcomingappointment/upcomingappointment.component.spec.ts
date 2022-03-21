import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingappointmentComponent } from './upcomingappointment.component';

describe('UpcomingappointmentComponent', () => {
  let component: UpcomingappointmentComponent;
  let fixture: ComponentFixture<UpcomingappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingappointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
