import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotesComponent } from './send-notes/send-notes.component';

import { ReceivedNotesComponent } from './received-notes/received-notes.component';
import { SentnotesComponent } from './sentnotes/sentnotes.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from '../main-layout/main-layout.module'
import { AuthGuardService } from '../Services/auth-guard.service';





@NgModule({
  declarations: [
    SendNotesComponent,
       ReceivedNotesComponent,
        SentnotesComponent,
        

  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MainLayoutModule,

    RouterModule.forChild([  
      {path: 'send-notes', component:SendNotesComponent, canActivate:[AuthGuardService]},
      {path: 'sentnotes', component:SentnotesComponent, canActivate:[AuthGuardService]},
      {path: 'received-notes', component:ReceivedNotesComponent, canActivate:[AuthGuardService]}
      
    ])


  ],
  exports: [SendNotesComponent, ReceivedNotesComponent, SentnotesComponent]
})
export class InboxModuleModule { }

