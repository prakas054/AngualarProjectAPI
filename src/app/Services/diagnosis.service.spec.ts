import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { diagnosis } from '../models/diagnosis';
import { DiagnosisService } from './diagnosis.service';

const sampleData:any[] = [
  {
     "Diagnosis_Id": "1",
     "Diagnosis_Code": "0001",
     "Diagnosis_Description": "Diagnosis 0001",
     "Diagnosis_Is_Depricated": true
   },
   {
    "Diagnosis_Id": "2",
    "Diagnosis_Code": "0002",
    "Diagnosis_Description": "Diagnosis 00002",
    "Diagnosis_Is_Depricated": false
  }
];

describe('DiagnosisService', () => {
  let service: DiagnosisService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint + "/api/Diagnosis"; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DiagnosisService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getAllDiagnosis().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });


  it('should return an diagnosis data', ( ) => {
    service.getAllDiagnosis().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();

  });

  it('should return an diagnosis data by diagnosisId', ( ) => {
    service.getDiagnosisId(1).subscribe(resData => {
      expect(resData).toEqual(sampleData[0]);
    });

    const request = httpController.expectOne(apiUrl + "/1");
    request.flush(sampleData[0]);
    httpController.verify();

  });

  it('Add diagnosis method should perform post method', ()=> {
     
    let diagnosisObj:diagnosis = new diagnosis();
      diagnosisObj.Diagnosis_Code = "0001";
      diagnosisObj.Diagnosis_Description = "Diagnosis 0001";
      diagnosisObj.Diagnosis_Is_Depricated = true;      
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.AddDiagnosis(diagnosisObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
  
  it('update diagnosis method should perform post method', ()=> {
     
    let diagnosisObj:diagnosis = new diagnosis();
      diagnosisObj.Diagnosis_Id = 1;
      diagnosisObj.Diagnosis_Code = "0001";
      diagnosisObj.Diagnosis_Description = "Diagnosis 0001";
      diagnosisObj.Diagnosis_Is_Depricated = true;      
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.updateDiagnosis(diagnosisObj.Diagnosis_Id,diagnosisObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
});
