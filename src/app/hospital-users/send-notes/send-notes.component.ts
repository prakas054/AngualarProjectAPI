import { ThisReceiver } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisteredUserAppoint } from 'src/app/models/appointment';
import { sendnote } from 'src/app/models/sendnote';
import { NotesService } from 'src/app/Services/notes.service';
import { UserregService } from 'src/app/Services/userreg.service';

@Component({
  selector: 'app-send-notes',
  templateUrl: './send-notes.component.html',
  styleUrls: ['./send-notes.component.css']
})
export class SendNotesComponent implements OnInit {
  
  
  form:FormGroup = new FormGroup({

    Id: new FormControl(""),  
    receiverName: new FormControl("", Validators.required),
    receiverDesignation: new FormControl("", Validators.required),
    message: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
    urgency : new FormControl("Urgent", Validators.required)

  });

  user:any;
  userdata:any;
  senderId:any;
  userId:any;
  receiverId:any;
  receiverdesignation:any;
  physianObj : RegisteredUserAppoint[] = [ ];
  
  constructor(private route:Router,  private fb: FormBuilder,
              private serviceRegist: UserregService, private service:NotesService,
              private notify:ToastrService){  }

  ngOnInit(): void {
    if(localStorage.getItem("PMSUser") == null)
    {
      this.route.navigateByUrl('/');
    }  

    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.senderId = this.userId = this.userdata.userId;

    this.getAllRegisrtation();
   
  }

  getAllRegisrtation()
  {
    this.serviceRegist.getRegstByRoleName("Physician").subscribe((resultPhysician)=> {
      this.physianObj = resultPhysician;
      console.log(resultPhysician)
    })
  }     

  setPhysicianId(event : any)
  {    
    let data = this.physianObj.find((x) => x?.name === event.target.value);
    this.receiverId = data?.userId;
    this.receiverdesignation=data?.role;
    console.log(this.receiverdesignation)
  }

  frm_sendnote_click(){
    debugger;
    let noteObj:sendnote = new sendnote();
    noteObj.SenderId = this.senderId;
    noteObj.ReceiverId = this.receiverId;
    noteObj.UserId = this.userId;
    noteObj.UrgencyLevel = this.form.value.urgency;
    noteObj.Message = this.form.value.message;

     this.service.sendNotes(noteObj).subscribe((result)=> {
         this.notify.success("Saved Successfully", "Success");
         this.route.navigateByUrl("/sentnotes");
     });

  }

}
