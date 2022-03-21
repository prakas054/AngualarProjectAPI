import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { drug } from 'src/app/models/drug';

import { DruglistComponent } from './druglist.component';

describe('DruglistComponent', () => {
  let component: DruglistComponent;
  let fixture: ComponentFixture<DruglistComponent>;
  let DRUG: drug[];

  beforeEach(async () => {

    DRUG = [
      { Drug_ID: 1, Drug_Name: 'Aripiprazolesss', Drug_Generic_Name: "Aripiprazolesss",Drug_Manufacture_Name:"USA.gov", Drug_Form :"liquids form", Drug_Strength :"100" },    
   ]

    await TestBed.configureTestingModule({
      declarations: [ DruglistComponent ],
      imports:[
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DruglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.drugArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getDrugList).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    //mockuserService.getUsers.and.returnValue(of(USERS));    
    fixture.detectChanges();        
    fixture.componentInstance.drugArray.push(DRUG[0]);
    expect(fixture.componentInstance.drugArray.length).toEqual(1);
  })
});
