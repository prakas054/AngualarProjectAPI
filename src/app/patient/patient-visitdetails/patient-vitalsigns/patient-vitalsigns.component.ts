import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-vitalsigns',
  templateUrl: './patient-vitalsigns.component.html',
  styleUrls: ['./patient-vitalsigns.component.css']
})
export class PatientVitalsignsComponent implements OnInit {

  vitaldetail: FormGroup = new FormGroup({});
  isFormSubmitted: boolean = false;
  message: string = "";
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.vitaldetail = this.fb.group({
      height: new FormControl("", [Validators.required,Validators.max(250)]),
      bodytemperature:new FormControl("",Validators.required),
      weight:new FormControl("",Validators.required),
      respirationrate:new FormControl("",Validators.required),
      bloodpressure:new FormControl("",Validators.required),
      
    });
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.vitaldetail.value)
    if (!this.vitaldetail.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.vitaldetail.value)
      return true;
    }
  }

  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }
}
