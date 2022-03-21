import { HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { changepassword } from '../models/changepassword';
import { getLogin } from '../models/getLogin';
import { LoginService } from './login.service';

const sampleData:any[] = [
  {
    "userId": 1,
    "employeeId": null,
    "firstName": "CT",
    "lastName": "Admin",
    "emailId": "amit.shinde@citiustech.com",
    "isActive": true,
    "loginAttempts": 0,
    "is_SetDefault": false,
    "roles": [
        {
            "id": 0,
            "userId": 1,
            "roleId": 1
        }
    ],
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJJbnZlbnRvcnlTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI1Yjk2YjNmMS05NzA2LTQ4NjEtOWQ0Ni00OWY1NDRjNmFlYWUiLCJpYXQiOiIyLzIwLzIwMjIgMTA6NTM6NTAgQU0iLCJpZCI6IjEiLCJGaXJzdE5hbWUiOiJDVCIsIkxhc3ROYW1lIjoiQWRtaW4iLCJVc2VyTmFtZSI6ImFtaXQuc2hpbmRlQGNpdGl1c3RlY2guY29tIiwiZXhwIjoxNjQ1NDQwODMwLCJpc3MiOiJJbnZlbnRvcnlBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkludmV0b3J5U2VydmljZVBvc3RtYW5DbGllbnQifQ.4bEiAv16qr7zSiz_1So41UmkLmfyduBmHjm_n3QLDFo"
}
];

describe('LoginService', () => {
  let service: LoginService;
  //let httpController: HttpTestingController;
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach( async() => {
    await TestBed.configureTestingModule({
        imports:[
          HttpClientModule,
          HttpClientTestingModule
        ],
        providers:[
          LoginService
        ]
    });
    //service = TestBed.inject(LoginService);    
    // httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
    service  =new LoginService(HttpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login method should return valid response if login is valid', ()=> {
     
    let loginObj:getLogin = new getLogin();
     loginObj.email = "amit.shinde@citiustech.com";
     loginObj.password = "Admin@123";     
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.login(loginObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  });

  it('login method should return user data', ()=> {
    let loginObj:getLogin = new getLogin();
     loginObj.email = "amit.shinde@citiustech.com";
     loginObj.password = "Admin@123";        

     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.login(loginObj).subscribe((resData:any)=> {
       expect(resData).toEqual(sampleData);
     });
  })

  it('login method should perform post method', (done:DoneFn)=> {
    let loginObj:getLogin = new getLogin();
    loginObj.email = "amit.shinde@citiustech.com";
    loginObj.password = "Admin@123";     

    HttpClientSpy.post.and.returnValue(of(sampleData));

    service.login(loginObj).subscribe((resData:any)=> {
       expect(resData).toEqual(sampleData);
       done();
    },
     done.fail
     );

     expect(HttpClientSpy.post.calls.count()).toBe(1);
  });

  it('change password method should perform post method', (done:DoneFn)=> {
    
    let changepwdObj:changepassword = new changepassword();
      changepwdObj.email = "amit.shinde@citiustech.com";
      changepwdObj.password = "Admin@123";
      changepwdObj.newpassword = "Admin@123#";   

    HttpClientSpy.post.and.returnValue(of(1));

    service.login(changepwdObj).subscribe((resData:any)=> {
      debugger;
       expect(resData).toEqual(1);
       done();
    },
     done.fail
     );

     expect(HttpClientSpy.post.calls.count()).toBe(1);
  });


});
