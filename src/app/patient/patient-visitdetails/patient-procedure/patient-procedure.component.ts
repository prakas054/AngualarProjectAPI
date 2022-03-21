import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-procedure',
  templateUrl: './patient-procedure.component.html',
  styleUrls: ['./patient-procedure.component.css']
})
export class PatientProcedureComponent implements OnInit {


  procedure: FormGroup = new FormGroup({});
  isFormSubmitted: boolean = false;
  message: string = "";
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute) { }
  ngOnInit(): void {
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.procedure.value)
    if (!this.procedure.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.procedure.value)
      return true;
    }
  }

  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }

}
