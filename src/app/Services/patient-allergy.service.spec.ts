import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { PatientAllergyService } from './patient-allergy.service';
const sampleData: any[] = [
  {
    "patient_Allergy_Id": 1,
    "allergy_Id": 1,
    "allergy_Code": "1115676",
    "allergy_Type": "Allergy2",
    "allergy_Name": "Insect",
    "is_Allergy_Fatal": true,
    "description": "ascvb",
    "clinical_Information": "Allergy info1",
    "userId": 26
  }
]
let apiUrl = environment.apiEndpoint + "/api/PatientAllergy";
let patientAllergy = "GetPatientAllergyDetails";


describe('PatientAllergyService', () => {
  let service: PatientAllergyService;
  let httpController: HttpTestingController;
  //let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy,put:jasmine.Spy,delete:jasmine.Spy};
  let tempData:any[]= [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientAllergyService]
    });
    //HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post','put','delete']);
    //service = new PatientAllergyService(HttpClientSpy as any);
    service = TestBed.inject(PatientAllergyService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all patient allergy details data', ( ) => {
    service.getAllPatientAllergy().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should insert patient allery details data', ( ) => {
    let obj:any = 
    { 
      "patient_Allergy_Id": 2,
      "allergy_Id": 3,
      "allergy_Code": "1115676",
      "allergy_Type": "Allergy2",
      "allergy_Name": "Insect",
      "is_Allergy_Fatal": true,
      "description": "ascvb",
      "clinical_Information": "Allergy info1",
      "userId": 26
    };
    service.AddPatientAllergy(obj).subscribe(resData => {
      expect(resData).toEqual(obj);
    });
    const request = httpController.expectOne(apiUrl);
    request.flush(obj);
    httpController.verify();
  });

  it('should return all patient allergy details data by Id', ( ) => {
    service.getPatientAllergyId(1).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl + "/" + 1);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should update patient allergy details data by Id', ( ) => {
    let obj:any = 
    { 
      "patient_Allergy_Id": 1,
      "allergy_Id": 3,
      "allergy_Code": "1115676",
      "allergy_Type": "Allergy1",
      "allergy_Name": "Food",
      "is_Allergy_Fatal": true,
      "description": "ascvb",
      "clinical_Information": "Allergy info1",
      "userId": 26
    };
    service.updatePatientAllergy(1,obj).subscribe(resData => {
      let updateObj = resData
      expect(resData).toEqual(updateObj);
    });
    const request = httpController.expectOne(apiUrl + "?id=" + 1,obj);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should return all patient allergy details data by userId', ( ) => {
    service.getPatientAllergyDetails(26).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl + "/" + patientAllergy + "/" + 26);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should delete patient allergy details data by Id', ( ) => {
    service.deletePatientAllergy(1).subscribe(resData => {
      let Obj = resData
      expect(resData).toEqual(Obj);
    });
    const request = httpController.expectOne(apiUrl+ "/" + "?id=" + 1);
    request.flush(sampleData);
    httpController.verify();
  });

});
