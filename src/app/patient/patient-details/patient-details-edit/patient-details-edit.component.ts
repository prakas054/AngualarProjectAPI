import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDetails } from 'src/app/models/patient-detail';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { PatientAllergyService } from 'src/app/Services/patient-allergy.service';



@Component({
  selector: 'app-patient-details-edit',
  templateUrl: './patient-details-edit.component.html',
  styleUrls: ['./patient-details-edit.component.css']
})
export class PatientDetailsEditComponent implements OnInit {

  patientdetail: FormGroup = new FormGroup({
    patientId: new FormControl(""),
    title: new FormControl("", Validators.required),
    fname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    lname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    dob: new FormControl("", [Validators.required, Validators.max(2021)]),
    gender: new FormControl("", Validators.required),
    race: new FormControl("", [Validators.required, Validators.minLength(2)]),
    ethnicity: new FormControl("", [Validators.required, Validators.minLength(2)]),
    language: new FormControl("", [Validators.required, Validators.minLength(2)]),
    address: new FormControl("", [Validators.required, Validators.minLength(10)]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^\\+1\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}$")]),
    etitle: new FormControl("", Validators.required),
    efname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    elname: new FormControl("", [Validators.required, Validators.minLength(2)]),
    erelation: new FormControl("", Validators.required),
    eEmail: new FormControl("", [Validators.required, Validators.email]),
    eaddress: new FormControl("", [Validators.required, Validators.minLength(10)]),
    ephone: new FormControl("", [Validators.required, Validators.pattern("^\\+1\\([0-9]{3}\\)[0-9]{3}-[0-9]{4}$")]),
    //isVisible: new FormControl("", Validators.required),
  });
  // allergy: FormGroup = new FormGroup({
  //     allergy_Id: new FormControl(""),
  //     allergyType: new FormControl(""),
  //     allergyName: new FormControl(""),
  //     description: new FormControl(""),
  //     clinical_Information: new FormControl(""),
  //     is_allergy_fatal: new FormControl(""),
  //     allergytypedetail: new FormControl("", [Validators.required, Validators.minLength(10)]),
  // });
  editId: number = 0;
  allergyId:number = 0;
  patientDetails: any;
  patientallergyDetails:any;
  access_to_patientPortal: any;
  isVisible: any;
  message: string = "";
  public age: any = null;
  isFormSubmitted: boolean = false;
  allergytype: any = "Allergy Type";
  isSelected: boolean = true;


  constructor(private router: Router, private fb: FormBuilder, private service: PatientDetailsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.editId = this.route.snapshot.params["id"];
    this.getPatientDetails(this.editId)
    
    // debugger;
    // this.getAllergydeatails(14);
  }

  getPatientDetails(id: number) {
    //debugger;
    this.service.getPatientDetailsId(id).subscribe((response: PatientDetails) => {

      this.patientDetails = response;
      console.log(this.patientDetails);
      this.patientdetail.controls['patientId'].setValue(this.patientDetails.patient_Id);
      this.patientdetail.controls['title'].setValue(this.patientDetails.title);
      this.patientdetail.controls['fname'].setValue(this.patientDetails.firstName);
      this.patientdetail.controls['lname'].setValue(this.patientDetails.lastName);
      this.patientdetail.controls['dob'].setValue(this.patientDetails.dob);
      this.age = this.patientDetails.age;
      this.patientdetail.controls['email'].setValue(this.patientDetails.emailId);
      this.patientdetail.controls['gender'].setValue(this.patientDetails.gender);
      this.patientdetail.controls['race'].setValue(this.patientDetails.race);
      this.patientdetail.controls['ethnicity'].setValue(this.patientDetails.ethnicity);
      this.patientdetail.controls['language'].setValue(this.patientDetails.language);
      this.patientdetail.controls['address'].setValue(this.patientDetails.address);
      this.patientdetail.controls['phone'].setValue(this.patientDetails.contactNo);
      this.patientdetail.controls['etitle'].setValue(this.patientDetails.emergency_Title);
      this.patientdetail.controls['efname'].setValue(this.patientDetails.emergency_FirstName);
      this.patientdetail.controls['elname'].setValue(this.patientDetails.emergency_LastName);
      this.patientdetail.controls['erelation'].setValue(this.patientDetails.emergency_Relation);
      this.patientdetail.controls['eEmail'].setValue(this.patientDetails.emergency_EmailId);
      this.patientdetail.controls['ephone'].setValue(this.patientDetails.emergency_ContactNo);
      // this.patientdetail.controls['isVisible'].setValue(this.patientDetails.allergy_Details)
      // this.access_to_patientPortal = this.patientDetails.access_To_Patient_Portal;
    });
  }

  // getAllergydeatails(id:number){
  //   this.allergyservice.getPatientAllergyId(id).subscribe((response:PatientAllergy) => {

  //     this.patientallergyDetails = response;
  //     console.log(this.patientallergyDetails);
  //     this.allergy.controls['allergy_Id'].setValue(this.patientallergyDetails.allergy_Id);
  //     this.allergy.controls['allergyType'].setValue(this.patientallergyDetails.allergy_Type);
  //     this.allergy.controls['allergyName'].setValue(this.patientallergyDetails.allergy_Name);
  //     this.allergy.controls['description'].setValue(this.patientallergyDetails.description);
  //     this.allergy.controls['clinical_Information'].setValue(this.patientallergyDetails.clinical_Information);
  //     this.allergy.controls['is_allergy_fatal'].setValue(this.patientallergyDetails.is_Allergy_Fatal);
  //     this.allergy.controls['is_allergy_fatal'].setValue(this.patientallergyDetails.is_Allergy_Fatal);
  //   });
  // }

  ageCalculator(): number {

    if (this.patientdetail.value.dob) {
      const bdate = new Date(this.patientdetail.value.dob);
      const timeDiff = Math.abs(Date.now() - bdate.getTime());
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    return this.age;
  }
  emergencyAddress(event: any) {
    debugger;
    if (event.target.checked == true) {
      this.patientdetail.value.eaddress = this.patientdetail.value.address
    }
    else {
      this.patientdetail.value.eaddress = "";
    }
  }

  frn_patientdetails_click() {
    if (this.patientdetail.valid) {
      debugger;

      let patientDetailsObj: PatientDetails = new PatientDetails();
      patientDetailsObj.Patient_Id = this.patientdetail.value.patientId;
      patientDetailsObj.Title = this.patientdetail.value.title;
      patientDetailsObj.FirstName = this.patientdetail.value.fname;
      patientDetailsObj.LastName = this.patientdetail.value.lname;
      patientDetailsObj.EmailId = this.patientdetail.value.email;
      patientDetailsObj.DOB = this.patientdetail.value.dob;
      patientDetailsObj.Age = this.age;
      patientDetailsObj.Gender = this.patientdetail.value.gender;
      patientDetailsObj.Race = this.patientdetail.value.race;
      patientDetailsObj.Ethnicity = this.patientdetail.value.ethnicity;
      patientDetailsObj.Language = this.patientdetail.value.language;
      patientDetailsObj.Address = this.patientdetail.value.address;
      patientDetailsObj.ContactNo = this.patientdetail.value.phone;
      patientDetailsObj.Emergency_Title = this.patientdetail.value.etitle;
      patientDetailsObj.Emergency_FirstName = this.patientdetail.value.efname;
      patientDetailsObj.Emergency_LastName = this.patientdetail.value.elname;
      patientDetailsObj.Emergency_Relation = this.patientdetail.value.erelation;
      patientDetailsObj.Emergency_EmailId = this.patientdetail.value.eEmail;
      patientDetailsObj.Emergency_Address = this.patientdetail.value.eaddress;
      patientDetailsObj.Emergency_ContactNo = this.patientdetail.value.ephone;
      // var str = this.patientdetail.value.isVisible;
      // patientDetailsObj.Allergy_Details = str;
      // if (str == "yes") {
      //   patientDetailsObj.Allergy_Details = true;
      // }
      // else {
      //   patientDetailsObj.Allergy_Details = false;
      // }
      // var str1 = this.access_to_patientPortal
      // patientDetailsObj.Access_To_Patient_Portal = str1;
      // if (str1 == true) {
      //   patientDetailsObj.Access_To_Patient_Portal = true;
      // }
      // else {
      //   patientDetailsObj.Access_To_Patient_Portal = false;
      // }
      this.service.updatePatientDetails(patientDetailsObj.Patient_Id, patientDetailsObj).subscribe((response: any) => {
        this.router.navigate(["/patientdetailslist"]);
      });
    }
  }

  submitForm() {
    this.isFormSubmitted = true;
    console.log(this.patientdetail.value)
    if (!this.patientdetail.valid) {
      this.message = 'The form contains one or more missing values';
      return false;
    } else {
      console.log(this.patientdetail.value)
      return true;
    }
  }
  btnCancel_click() {
    this.router.navigate(["/patientdetailslist"]);
  }
}
