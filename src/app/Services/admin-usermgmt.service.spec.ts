import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { updateUserStatus } from '../models/updateUserStatus';
import { AdminUsermgmtService } from './admin-usermgmt.service';

describe('AdminUsermgmtService', () => {
  let service: AdminUsermgmtService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(AdminUsermgmtService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getAdminUserList().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl + "/api/Registration");
    request.flush(tempData);
    httpController.verify();
  });

  it('should return an hospital user list data', ( ) => {
    service.getAdminUserList().subscribe(resData => {
      tempData = resData;
      expect(resData).toEqual(tempData);
    });

    const request = httpController.expectOne(apiUrl + "/api/Registration");
    request.flush(tempData);
    httpController.verify();

  });

  it('should return an patient user list data', ( ) => {
    service.getPatientUserList().subscribe(resData => {
      tempData = resData;
      expect(resData).toEqual(tempData);
    });

    const request = httpController.expectOne(apiUrl + "/api/Registration/GetPatientList");
    request.flush(tempData);
    httpController.verify();

  });

  it('registerUser method should perform post method', ()=> {
      
    let userObj:updateUserStatus = new updateUserStatus();

    userObj.userId = 1;
    userObj.status = "Inactive";
   
    service.updateUserStatus(userObj).subscribe((resData:any)=> {      
      expect(resData.length).toEqual(1);
    });
  }); 

});
