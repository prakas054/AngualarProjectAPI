import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { VisitDetailsService } from './visit-details.service';
const sampleData: any[] = [
  {
    "visit_Id": 2,
    "visit_Date": "2022-02-23T00:00:00",
    "height": "90",
    "weight": "40",
    "blood_Pressure": "56",
    "body_Temperature": "45",
    "respiration_Rate": "45",
    "userId": 26,
  }];
  let apiUrl = environment.apiEndpoint + "/api/PatientVisits"; 
  let visitHistory ="Visithistory";
  let visitdetails = "VisitDetail";
describe('VisitDetailsService', () => {
  let service: VisitDetailsService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VisitDetailsService]
    });
    service = TestBed.inject(VisitDetailsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all patient visit history list', ( ) => {
    service.getPatientVisitList(26).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl+ "/" + visitHistory + "/" + 26);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should return all patient visit details list', ( ) => {
    service.getPatientVisitdetail(26).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl+ "/" + visitdetails + "/" + 26);
    request.flush(sampleData);
    httpController.verify();
  });

  it('should return all patient  details list for physician', ( ) => {
    service.getAllPatientVisitHistory().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });
    const request = httpController.expectOne(apiUrl+  "/" + "VisithistoryListForPhysician");
    request.flush(sampleData);
    httpController.verify();
  });
});
