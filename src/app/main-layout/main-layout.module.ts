import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    RouterModule.forChild([
      {path: 'header', component:HeaderComponent}, 
      {path: 'footer', component:FooterComponent},         
    ]),
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class MainLayoutModule { }
