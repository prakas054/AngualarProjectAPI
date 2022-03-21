import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { VisitdetailslistComponent } from './visitdetailslist.component';
var sampleData : any [] = [{
  "patientVisits": {
    "visit_Id": 1,
    "visit_Date": "2022-01-02T00:00:00",
    "height": "120",
    "weight": "50",
    "blood_Pressure": "24",
    "body_Temperature": "23",
    "respiration_Rate": "35",
    "userId": 26,
    "createdOn": null,
    "createdBy": null,
    "updatedBy": null,
    "updatedOn": null,
    "note": null
},
"diagnoses": [
    {
        "id": 0,
        "visit_Id": 1,
        "diagnosis_Id": 70,
        "diagnosis_Code": "C9150",
        "diagnosis_Description": "Adult T-cell lymph/leuk (HTLV-1-assoc) not achieve remission",
        "diagnosis_Is_Depricated": null,
        "description": null,
        "note": null
    },
    
],
"procedures": [
    {
        "id": 0,
        "visit_Id": 1,
        "procedure_Id": 1,
        "procedure_Code": "16070",
        "procedure_Description": "Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute, Open Approach",
        "procedure__Is_Depricated": null,
        "description": null,
        "note": null
    }
],
"medications": [
    {
        "id": 0,
        "visit_Id": 1,
        "drug_Id": 8,
        "drug_Name": "Aripiprazolesss",
        "drug_Generic_Name": "Aripiprazole",
        "drug_Manufacture_Name": null,
        "drug_Form": "liquids form",
        "drug_Strength": null,
        "dosage": "100",
        "description": null,
        "note": null
    }]
}];
describe('VisitdetailslistComponent', () => {
  let component: VisitdetailslistComponent;
  let fixture: ComponentFixture<VisitdetailslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitdetailslistComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitdetailslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.componentInstance.visitHistory.length;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.visitHistory).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getPateintVisitHistory).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    fixture.detectChanges();        
    fixture.componentInstance.visitHistory.push(sampleData[0]);
    expect(fixture.componentInstance.visitHistory.length).toEqual(2);
  });

});
