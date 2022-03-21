import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { sendnote } from '../models/sendnote';
import { NotesService } from './notes.service';

const sampleData:any[] = [
  {
     "Id": "1",
     "UserId": "9",
     "date": "2022-03-10",
     "Description":"",
     "SenderId":"9",
     "ReceiverId":"6",
     "Message":"be ready for heart operation on 12 march at 11am",
     "UrgencyLevel":"Urgent",
     "ReplyId":0,
     "IsActive": true,
   }  
];

describe('NotesService', () => {
  let service: NotesService;
  let httpController: HttpTestingController;
  let tempData:any[]= [];
  let apiUrl = environment.apiEndpoint  + "/api/Notes";; 
  let HttpClientSpy: {get:jasmine.Spy,post:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(NotesService);
    httpController = TestBed.inject(HttpTestingController);
    HttpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return an Observable<any[]>', () => {
    service.getSentNotes(9).subscribe( (resData:any[]) => {
      tempData = resData;
      expect(resData.length).toBe(tempData.length);
    });

    const request = httpController.expectOne(apiUrl + "/SentNotes/9");
    request.flush(sampleData);
    httpController.verify();
  });


  it('should return an received notes data', ( ) => {
    service.getReceivedNotes(9).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl + "/ReceivedNotes/9");
    request.flush(sampleData);
    httpController.verify();

  });

  it('should return an sent notes data', ( ) => {
    service.getSentNotes(9).subscribe(resData => {
      expect(resData).toEqual(sampleData);
    });

    const request = httpController.expectOne(apiUrl + "/SentNotes/9");
    request.flush(sampleData);
    httpController.verify();

  });


  it('sent note method should perform post method', ()=> {
     
    let noteObj:sendnote = new sendnote();
    noteObj.SenderId = 9;
    noteObj.ReceiverId = 6;
    noteObj.UserId = 9;
    noteObj.UrgencyLevel = "Urgent";
    noteObj.Message = "Meeting";
     
     service.sendNotes(noteObj).subscribe((resData:any)=> {      
       expect(resData.length).toEqual(1);
     });
  }); 

  
});
