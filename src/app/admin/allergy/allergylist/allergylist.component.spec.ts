import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { RouterTestingModule } from '@angular/router/testing';
import { Allergy } from 'src/app/models/allergy';
import { AllergylistComponent } from './allergylist.component';

describe('AllergylistComponent', () => {
  let component: AllergylistComponent;
  let fixture: ComponentFixture<AllergylistComponent>;
  let ALLERGY: Allergy[];

  beforeEach(async () => {

    ALLERGY = [
        { Allergy_Id: 1, Allergy_Code: '10200112', Allergy_Type: "PHIN-VADS",Allergy_Name:"Hemoglobin Okaloosa", Allergy_Description :"ADFDFDAS", Allergy_Clinical_Information :"Hemoglobin", Allergy_Source:"FHIR",allerginicity :"",allergy_IsFatal:"" },    
     ]

    await TestBed.configureTestingModule({
      declarations: [ AllergylistComponent ],
      imports : [RouterTestingModule, HttpClientModule, MatFormFieldModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.allrgyArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getAllergyList).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    //mockuserService.getUsers.and.returnValue(of(USERS));    
    fixture.detectChanges();        
    fixture.componentInstance.allrgyArray.push(ALLERGY[0]);
    expect(fixture.componentInstance.allrgyArray.length).toEqual(1);
  })
});
