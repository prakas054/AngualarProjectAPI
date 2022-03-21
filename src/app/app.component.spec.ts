import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CommonModule, Location } from '@angular/common';

describe('AppComponent', () => {

let location:Location;
let router:Router;
let activatedRoute:ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,       
        CommonModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'add', component: AppComponent, pathMatch: 'full'}
          ]
        )            
      ],
      declarations: [
        AppComponent
      ], 
      providers:[
        Location
      ]     
    }).compileComponents();
    
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);   
    
    router.initialNavigation();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PatientManagementSystem'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PatientManagementSystem');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('PatientManagementSystem app is running!');
  });

  it('should go to login when your request url is empty', ()=> {
     router.navigateByUrl("/").then( ()=> {
       expect(location.path()).toBe('');
     });
  });
});
