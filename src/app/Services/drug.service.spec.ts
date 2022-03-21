import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { drug } from '../models/drug';
import { DrugService } from './drug.service';

const sampleData:any[] = [
  {
     "Drug_ID": "1",
     "Drug_Name": "Aripiprazolesss",
     "Drug_Generic_Name": "Aripiprazole",
     "Drug_Manufacture_Name": "USA.gov",
     "Drug_Form": "liquids form",
     "Drug_Strength": "100",

   },
   {
    "Drug_ID": "2",
    "Drug_Name": "SampleDrug",
    "Drug_Generic_Name": "Sample",
    "Drug_Manufacture_Name": "Drug",
    "Drug_Form": "pawder",
    "Drug_Strength": "1000",
  }
];

describe('DrugService', () => {
  let service: DrugService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint + "/api/DrugData"; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DrugService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getAllDrugs().subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();
  });


  it('should return an drug data', ( ) => {
    service.getAllDrugs().subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl);
    request.flush(sampleData);
    httpController.verify();

  });

  it('should return an drug data data by drugId', ( ) => {
    service.getDrugById(1).subscribe(resData => {
      expect(resData).toEqual(sampleData[0]);
    });

    const request = httpController.expectOne(apiUrl + "/1");
    request.flush(sampleData[0]);
    httpController.verify();

  });

  it('Add drug method should perform post method', ()=> {
     
    let drugObj:drug = new drug();
    drugObj.Drug_Name = "Aripiprazole";
    drugObj.Drug_Generic_Name = "Aripiprazole";
    drugObj.Drug_Manufacture_Name = "USA.gov";
    drugObj.Drug_Form = "liquids form";
    drugObj.Drug_Strength = "100";   
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.AddDrug(drugObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 
  
  it('update drug method should perform post method', ()=> {
     
    let drugObj:drug = new drug();
    drugObj.Drug_ID = 1;
    drugObj.Drug_Name = "Aripiprazole";
    drugObj.Drug_Generic_Name = "Aripiprazole";
    drugObj.Drug_Manufacture_Name = "USA.gov";
    drugObj.Drug_Form = "liquids form";
    drugObj.Drug_Strength = "100";       
     
     HttpClientSpy.post.and.returnValue(of(sampleData));
     
     service.updateDrug(drugObj.Drug_ID,drugObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  });   

});
