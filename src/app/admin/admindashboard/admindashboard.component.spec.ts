import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AdmindashboardComponent } from './admindashboard.component';

describe('AdmindashboardComponent', () => {
  let component: AdmindashboardComponent;
  let fixture: ComponentFixture<AdmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindashboardComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.totalusers).toBeDefined();
    expect(component.totalpatients).toBeDefined();
    expect(component.totalnurses).toBeDefined();
    expect(component.totalphysicians).toBeDefined();
  });

  it('users count value should be positive', () => {
    expect(component.totalusers).toBeGreaterThanOrEqual(0);
    expect(component.totalpatients).toBeGreaterThanOrEqual(0);
    expect(component.totalnurses).toBeGreaterThanOrEqual(0);
    expect(component.totalphysicians).toBeGreaterThanOrEqual(0);
  });

});
