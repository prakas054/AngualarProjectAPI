import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { PatientDetailsService } from './patient-details.service';
const sampleData:any[] = [
  {
     "UserId": 33,
     "Patient_Id":1,
     "Title": "Mr.",
     "FirstName":"Amit",
     "LastName":"Shinde",
     "EmailId":"amy21690@gmail.com",
     "DOB":"1990-06-21",
     "Age":"30",
     "ContactNo":"9090909090",
     "Gender":"Male",
     "Race":"sacnm",
     "Ethnicity":"jkl",
     "Language":"English",
     "Address":"asdc vnmo",
     "Emergency_Title":"Ms.",
     "Emergency_FirstName":"ascv",
     "Emergency_LastName":"asdcv",
     "Emergency_EmailId":"asdv@mail",
     "Emergency_ContactNo":"9090909090",
     "Emergency_Relation":"Friend",
     "Emergency_Address":"asdcv nmjkl",
     "Allergy_Details":"true"
   }
];
let apiUrl = environment.apiEndpoint + "/api/PatientDetails";
let demographicUrl = "GetPatientDemoGraphicDetails";

describe('PatientDetailsService', () => {
  let service: PatientDetailsService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientDetailsService]
    });
    service = TestBed.inject(PatientDetailsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getAllPatientDetails().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(1);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });
  it('should return all patient details data', ( ) => {
    service.getAllPatientDetails().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();

  });
  it('should insert patient details data', ( ) => {
    let obj:any = 
    { 
      "UserId": 34,
     "Patient_Id":2,
     "Title": "Mr.",
     "FirstName":"Arun",
     "LastName":"K A",
     "EmailId":"arun@gmail.com",
     "DOB":"1990-06-21",
     "Age":"30",
     "ContactNo":"9090909090",
     "Gender":"Male",
     "Race":"sacnm",
     "Ethnicity":"jkl",
     "Language":"English",
     "Address":"asdc vnmo",
     "Emergency_Title":"Ms.",
     "Emergency_FirstName":"ascv",
     "Emergency_LastName":"asdcv",
     "Emergency_EmailId":"asdv@mail",
     "Emergency_ContactNo":"9090909090",
     "Emergency_Relation":"Friend",
     "Emergency_Address":"asdcv nmjkl",
     "Allergy_Details":"true"   
    };
    service.AddPatientDetails(obj).subscribe(resData => {
      expect(resData).toEqual(obj);
    });
    const request = httpController.expectOne(apiUrl);
    request.flush(obj);
    httpController.verify();
  });

  it('should return all patient details data by Id', ( ) => {
    service.getPatientDetailsId(1).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl + "/" + 1);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should update patient details data by Id', ( ) => {
    let obj:any = 
    { 
      "UserId": 33,
      "Patient_Id":1,
      "Title": "Mr.",
      "FirstName":"Amit",
      "LastName":"Shinde",
      "EmailId":"amy21690@gmail.com",
      "DOB":"1990-06-21",
      "Age":"30",
      "ContactNo":"9090909090",
      "Gender":"Male",
      "Race":"sacnm",
      "Ethnicity":"Asian",
      "Language":"English",
      "Address":"asdc vnmo",
      "Emergency_Title":"Ms.",
      "Emergency_FirstName":"ascv",
      "Emergency_LastName":"asdcv",
      "Emergency_EmailId":"asdv@mail",
      "Emergency_ContactNo":"9090909090",
      "Emergency_Relation":"Friend",
      "Emergency_Address":"asdcv nmjkl",
      "Allergy_Details":"true"
    };
    service.updatePatientDetails(1,obj).subscribe(resData => {
      let updateObj = resData
      expect(resData).toEqual(updateObj);
    });
    const request = httpController.expectOne(apiUrl + "?id=" + 1,obj);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should return all patient demographic details data by userId', ( ) => {
    service.getPatientDemographicDetails(1).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl + "/" + demographicUrl + "/" + 1);
    request.flush(sampleData);
    httpController.verify();
  });
});
