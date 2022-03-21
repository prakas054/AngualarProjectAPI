import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { diagnosis } from 'src/app/models/diagnosis';
import { DiagnosisService } from 'src/app/Services/diagnosis.service';

@Component({
  selector: 'app-patient-diagnosis',
  templateUrl: './patient-diagnosis.component.html',
  styleUrls: ['./patient-diagnosis.component.css']
})
export class PatientDiagnosisComponent implements OnInit {

  diagnosis: FormGroup = new FormGroup({});
  tempdiagnosisdata: any = [];
  //tempdiagnosiscode: any = [];
  isFormSubmitted: boolean = false;
  message: string = "";
  dataSource: any;
  diagnosisArray: any = [];
  diagnosisCode: string = "";

  constructor(private fb: FormBuilder, private route: Router, private router: ActivatedRoute, private service: DiagnosisService) {

  }
  ngOnInit(): void {
    this.getDiagnosisList();
    this.diagnosis = this.fb.group({
      Diagnosis_Code: new FormControl(""),
      Diagnosis_Description: new FormControl(""),
    });
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.diagnosis.value)
    if (!this.diagnosis.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.diagnosis.value)
      return true;
    }
  }

  getDiagnosisList() {
    this.service.getAllDiagnosis().subscribe((result: diagnosis[]) => {
      //debugger
      this.diagnosisArray = result;
      console.log(this.diagnosisArray);
    })
  }

  filterDiagnosisdescription(diagnosisArray: any) {
    console.log(diagnosisArray.target.value);
    this.tempdiagnosisdata = this.diagnosisArray.filter((e: any) => e.diagnosis_Description == diagnosisArray.target.value);
    this.diagnosisCode = this.tempdiagnosisdata[0].diagnosis_Code;
    console.log(this.tempdiagnosisdata);
  }

  filterDiagnosiscode(diagnosisArray: any) {
    console.log(diagnosisArray.target.value);
    if (diagnosisArray.target.value !== "") {
      //this.getDiagnosisList();
      debugger
      this.tempdiagnosisdata = this.diagnosisArray.filter((e: any) => e.diagnosis_Code == diagnosisArray.target.value);
      this.diagnosisArray = this.tempdiagnosisdata;
      console.log(this.diagnosisArray);
    }
    else {
      this.getDiagnosisList();
      debugger
      this.diagnosisArray;
      console.log(this.diagnosisArray);
    }

  }



  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }
}
