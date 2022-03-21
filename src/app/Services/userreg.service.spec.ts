import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatientReg } from '../models/patient-reg';
import { UserregService } from './userreg.service';

const sampleData:any[] = [
  {
     "UserId": "1",
     "Title": "Mr.",
     "EmployeeId": "83",
     "Username": "amit.shinde@citiustech.com",
     "Password":"Admin@1234",
     "FirstName":"CT",
     "LastName":"Admin@1234",
     "EmailId":"amit.shinde@citiustech.com",
     "DOB":"1999-06-21",
     "ContactNo":"",
     "IsActive": true,
     "Status":"Active"
   }
];

describe('UserregService', () => {
  let service: UserregService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint + "/api/Registration"; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserregService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getUserList().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(tempData);
    httpController.verify();
  });

  it('should return an user list data', ( ) => {
    service.getUserList().subscribe(resData => {
      tempData = resData;
      expect(resData).toEqual(tempData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(tempData);
    httpController.verify();

  });

  it('should return an user data data by userId', ( ) => {
    service.getUser(1).subscribe(resData => {
      expect(resData).toEqual(sampleData[0]);
    });

    const request = httpController.expectOne(apiUrl + "/1");
    request.flush(sampleData[0]);
    httpController.verify();

  });

  it('registerUser method should perform post method', ()=> {
      
    let regObj:PatientReg = new PatientReg();
    regObj.Title = "Mr.";
    regObj.FirstName = "Amit";
    regObj.LastName = "Shinde";
    regObj.EmailId = "amit.shinde@citiustech.com";
    regObj.DOB = new Date("1990-06-21");
    regObj.ContactNo = "";
    regObj.EmployeeId = 83;     
    regObj.Role = "Admin";
    regObj.Status = "Active";
   
    HttpClientSpy.post.and.returnValue(of(sampleData));
   
   service.registerUser(regObj).subscribe((resData:any)=> {      
     expect(resData.length).toEqual(1);
   });
  }); 

  it('update user method should perform post method', ()=> {
     
    let regObj:PatientReg = new PatientReg();
    regObj.UserId = 1;
    regObj.Title = "Mr.";
    regObj.FirstName = "Amit";
    regObj.LastName = "Shinde";
    regObj.EmailId = "amit.shinde@citiustech.com";
    regObj.DOB = new Date("1990-06-21");
    regObj.ContactNo = "";
    regObj.EmployeeId = 83;     
    regObj.Role = "Admin";
    regObj.Status = "Active";    
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.updateUser(regObj.UserId,regObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  });


  it('should return an user by role name', ( ) => {
    service.getRegstByRoleName('Admin').subscribe(resData => {
      tempData = resData;
      expect(resData).toEqual(tempData);
    });

    const request = httpController.expectOne(apiUrl+ "/GetAll");
    request.flush(tempData);
    httpController.verify();

  });

});
