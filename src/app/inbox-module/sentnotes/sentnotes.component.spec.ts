import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentnotesComponent } from './sentnotes.component';

describe('SentnotesComponent', () => {
  let component: SentnotesComponent;
  let fixture: ComponentFixture<SentnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
