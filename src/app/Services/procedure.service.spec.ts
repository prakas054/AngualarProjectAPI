import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Procedure } from '../models/procedure';
import { ProcedureService } from './procedure.service';

const sampleData:any[] = [
  {
     "Procedure_ID": "1",
     "Procedure_Code": "001607A",
     "Procedure_Description": "Bypass Cerebral Ventricle to Subgaleal Space with Autologous Tissue Substitute",
     "Procedure_Is_Depricated": false
   }
];

describe('ProcedureService', () => {
  let service: ProcedureService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint + "/api/Procedure"; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {    
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProcedureService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getProcedurList().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });


  it('should return an procedure data', ( ) => {
    service.getProcedurList().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();

  });

  it('should return an procedure data by procedureId', ( ) => {
    service.getProcedurById(1).subscribe(resData => {
      expect(resData).toEqual(sampleData[0]);
    });

    const request = httpController.expectOne(apiUrl + "/1");
    request.flush(sampleData[0]);
    httpController.verify();

  });

  it('Add procedure method should perform post method', ()=> {
      
      let procedureObj:Procedure = new Procedure();
      procedureObj.Procedure_Code = "001607A";
      procedureObj.Procedure_Description = "Bypass Cerebral Ventricle to Subgaleal Space with Autologous Tissue Substitute";
      procedureObj.Procedure_Is_Depricated = false;
     
      HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.AddProcedur(procedureObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
  
  it('update procedure method should perform post method', ()=> {
     
    let procedureObj:Procedure = new Procedure();
      procedureObj.Procedure_ID = 1;
      procedureObj.Procedure_Code = "001607A";
      procedureObj.Procedure_Description = "Bypass Cerebral Ventricle to Subgaleal Space with Autologous Tissue Substitute";
      procedureObj.Procedure_Is_Depricated = false;     
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.updateProcedur(procedureObj.Procedure_ID,procedureObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
});
