import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-allergy',
  templateUrl: './patient-allergy.component.html',
  styleUrls: ['./patient-allergy.component.css']
})
export class PatientAllergyComponent implements OnInit {

  allergy: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.allergy = this.fb.group({
      allergy_Id: new FormControl(""),
      allergyType: new FormControl(""),
      allergyName: new FormControl(""),
      description: new FormControl(""),
      clinical_Information: new FormControl(""),
      //is_allergy_fatal: new FormControl(""),
      allergytypedetail: new FormControl("", [Validators.required, Validators.minLength(10)]),
    });
  }

  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }
}
