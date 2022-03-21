import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiciandashComponent } from './physiciandash.component';

describe('PhysiciandashComponent', () => {
  let component: PhysiciandashComponent;
  let fixture: ComponentFixture<PhysiciandashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysiciandashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiciandashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
