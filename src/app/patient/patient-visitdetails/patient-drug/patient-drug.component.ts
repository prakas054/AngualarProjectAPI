import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-drug',
  templateUrl: './patient-drug.component.html',
  styleUrls: ['./patient-drug.component.css']
})
export class PatientDrugComponent implements OnInit {

  drug: FormGroup = new FormGroup({});
  isFormSubmitted: boolean = false;
  message: string = "";
  
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.drug.value)
    if (!this.drug.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.drug.value)
      return true;
    }
  }

  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }
}
