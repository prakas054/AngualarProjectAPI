import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { diagnosis } from 'src/app/models/diagnosis';

import { DiagnosislistComponent } from './diagnosislist.component';

describe('DiagnosislistComponent', () => {
  let component: DiagnosislistComponent;
  let fixture: ComponentFixture<DiagnosislistComponent>;
  let DIAGNOSIS: diagnosis[];

  beforeEach(async () => {

    DIAGNOSIS = [
      { Diagnosis_Id: 1, Diagnosis_Code: '0001', Diagnosis_Description: "Diagnosis 0001",Diagnosis_Is_Depricated: true },    
   ]

    await TestBed.configureTestingModule({
      declarations: [ DiagnosislistComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosislistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.diagnosisArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getDiagnosisList).toBeDefined();
  });

  it('should set data correctly', () => {
        
    fixture.detectChanges();        
    fixture.componentInstance.diagnosisArray.push(DIAGNOSIS[0]);
    expect(fixture.componentInstance.diagnosisArray.length).toEqual(1);
  })

});
