import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Procedure } from 'src/app/models/procedure';
import { ProcedurelistComponent } from './procedurelist.component';

describe('ProcedurelistComponent', () => {
  let component: ProcedurelistComponent;
  let fixture: ComponentFixture<ProcedurelistComponent>;
  let PROCEDURE: Procedure[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedurelistComponent ],
      imports : [RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {

    PROCEDURE = [
      { Procedure_ID: 1, Procedure_Code: '001607A', Procedure_Description: "Bypass Cerebral Ventricle to Subgaleal Space with Autologous Tissue Substitute",Procedure_Is_Depricated:false },    
   ]

    fixture = TestBed.createComponent(ProcedurelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state',() => {
    expect(component.procedureArray).toBeDefined();   
    expect(component.ngOnInit).toBeDefined();
    expect(component.getProcedureList).toBeDefined();
  });

  it('should set data correctly', () => {
    debugger;
    //mockuserService.getUsers.and.returnValue(of(USERS));    
    fixture.detectChanges();        
    fixture.componentInstance.procedureArray.push(PROCEDURE[0]);
    expect(fixture.componentInstance.procedureArray.length).toEqual(1);
  })
});
