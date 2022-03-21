import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { admindashboard } from '../models/AdminDashboard';

import { AdmindashboardService } from './admindashboard.service';

describe('AdmindashboardService', () => {
  let service: AdmindashboardService;
  let httpController: HttpTestingController;
  let tempData:any;
  let apiUrl = environment.apiEndpoint; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(AdmindashboardService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any>', () => {
    service.getdashboardcount().subscribe( (resData:any) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });
  });

  it('should return all users count positive', () => {
    service.getdashboardcount().subscribe( (resData:any) => {     
      let data = JSON.parse(resData);      
      expect(data.totalusers).toBeGreaterThanOrEqual(0);
      expect(data.totalphysicians).toBeGreaterThanOrEqual(0);
      expect(data.totalnurses).toBeGreaterThanOrEqual(0);
      expect(data.totalpatients).toBeGreaterThanOrEqual(0);     
    });
  });
});
