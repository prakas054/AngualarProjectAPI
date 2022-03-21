import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PatientReg } from '../models/patient-reg';

import { PatientRegService } from './patient-reg.service';

describe('PatientRegService', () => {
  let service: PatientRegService;
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach( async() => {
    await TestBed.configureTestingModule({
     imports:[
       HttpClientModule
     ],
     providers:[
       HttpClient
     ]
    });
    //service = TestBed.inject(PatientRegService);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
    service  =new PatientRegService(HttpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registration method should return valid response', ()=> {
     
    let patientObj:PatientReg = new PatientReg();
    patientObj.Title = "Mr.";
    patientObj.FirstName = "CT";
    patientObj.LastName = "Patient";
    patientObj.EmailId = "Patient@gmail.com";
    patientObj.DOB = new Date();
    patientObj.ContactNo = "9960262290";
    patientObj.Password = "Patient@123";     
    patientObj.Role = "Patient";    
     
    HttpClientSpy.post.and.returnValue(of(1));
     
     service.createPatientReg(patientObj).subscribe((resData:any)=> {     
       debugger; 
       expect(resData).toEqual(1);
     });
  });

  it('should perform post method', (done:DoneFn)=> {
  
    let patientObj:PatientReg = new PatientReg();
    patientObj.Title = "Mr.";
    patientObj.FirstName = "CT";
    patientObj.LastName = "Patient";
    patientObj.EmailId = "Patient@gmail.com";
    patientObj.DOB = new Date();
    patientObj.ContactNo = "9960262290";
    patientObj.Password = "Patient@123";     
    patientObj.Role = "Patient";     

    HttpClientSpy.post.and.returnValue(of(1));

    service.createPatientReg(patientObj).subscribe((resData:any)=> {
       expect(resData).toEqual(1);
       done();
    },
     done.fail
     );

     expect(HttpClientSpy.post.calls.count()).toBe(1);
  });


});
