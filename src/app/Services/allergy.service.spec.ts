import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Allergy } from '../models/allergy';
import { AllergyService } from './allergy.service';

const sampleData:any[] = [
  {
     "Allergy_Id": "1",
     "Allergy_Code": "10200112",
     "Allergy_Type": "PHIN-VADS",
     "Allergy_Name":"Hemoglobin Okaloosa",
     "Allergy_Description":"ADFDFDAS",
     "Allergy_Clinical_Information":"Hemoglobin",
     "Allergy_Source":"FHIR",
     "Allerginicity":"",
   },
   {
    "Allergy_Id": "2",
    "Allergy_Code": "z88.90",
    "Allergy_Type": "SDCdfg",
    "Allergy_Name":"penicillin",
    "Allergy_Description":"zfdsg",
    "Allergy_Clinical_Information":"penicillinsld",
    "Allergy_Source":"dvfdgfd",
    "Allerginicity":"",
  }
];

describe('AllergyService', () => {
  let service: AllergyService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint + "/api/Allergy"; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers:[
        AllergyService
      ]
    });
    service = TestBed.inject(AllergyService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getAllAllergy().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });


  it('should return an allergy data', ( ) => {
    service.getAllAllergy().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();

  });

  it('should return an allergy data by allergyId', ( ) => {
    service.getAllergyById(1).subscribe(resData => {
      expect(resData).toEqual(sampleData[0]);
    });

    const request = httpController.expectOne(apiUrl + "/1");
    request.flush(sampleData[0]);
    httpController.verify();

  });

  it('Add Allergy method should perform post method', ()=> {
     
    let allergyObj:Allergy = new Allergy();
    allergyObj.Allergy_Code = "000234";
    allergyObj.Allergy_Type = "Type1";
    allergyObj.Allergy_Name = "Allergy000234";
    allergyObj.Allergy_Description = "PWD";
    allergyObj.Allergy_Clinical_Information = "Allergy000234";
    allergyObj.Allergy_Source = "Lab"; 
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.AddAllergy(allergyObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
  
  it('update Allergy method should perform post method', ()=> {
     
    let allergyObj:Allergy = new Allergy();
    allergyObj.Allergy_Id = 1;
    allergyObj.Allergy_Code = "000234";
    allergyObj.Allergy_Type = "Type1";
    allergyObj.Allergy_Name = "Allergy000234";
    allergyObj.Allergy_Description = "PWD";
    allergyObj.Allergy_Clinical_Information = "Allergy000234";
    allergyObj.Allergy_Source = "Lab"; 
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.updateAllergy(allergyObj.Allergy_Id,allergyObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
});
