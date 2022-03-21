import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientDetails } from 'src/app/models/patient-detail';
import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { PatientAllergyService } from 'src/app/Services/patient-allergy.service';
import { PatientAllergy } from 'src/app/models/Patient-Allergy';
import { ToastrService } from 'ngx-toastr';
import { PatientRegService } from 'src/app/Services/patient-reg.service';
import { PatientReg } from 'src/app/models/patient-reg';
import { DatePipe } from '@angular/common';
import { Allergy } from 'src/app/models/allergy';
import { AllergyService } from 'src/app/Services/allergy.service';
import { BooleanTransformPipe } from '../boolean-transform.pipe';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: Router,
    private router: ActivatedRoute, private service: PatientDetailsService, private allergyService: AllergyService,
    private patientreg: PatientRegService, private patientallergyService: PatientAllergyService,
    private notify: ToastrService, private datepipe: DatePipe, private boolpipe:BooleanTransformPipe) { }

  isVisible: any;
  isSelected: boolean = true;
  allergytype: any = "Allergy Type";
  isFormSubmitted: boolean = false;
  access_to_patientPortal: any;
  public message: string = "";
  public age: any = null;
  patiendetails: any;
  patientallergydetails: any;
  tempDetails: any;
  patientdetail: FormGroup = new FormGroup({});
  disable: boolean = false;
  readonly: any;
  allergyList: any = [];
  allergyArray: any = [];
  tempallergydata: any = [];
  clinicalinformation: any;

  user: any = "";
  userdata: any = "";
  email: string = "";
  userId: number = 0;
  allergy: FormGroup = new FormGroup({});

  ngOnInit(): void {

    //debugger
    this.user = localStorage.getItem("PMSUser");
    this.userdata = JSON.parse(this.user);
    this.userId = this.userdata.userId;

    // this.getPatientDetailsList();

    this.patientdetail = this.fb.group({
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
      phone: new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]),
      etitle: new FormControl("", Validators.required),
      efname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      elname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      erelation: new FormControl("", Validators.required),
      eEmail: new FormControl("", [Validators.required, Validators.email]),
      eaddress: new FormControl("", [Validators.required, Validators.minLength(10)]),
      ephone: new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]),
      isVisible: new FormControl("", Validators.required),
      address_same_as_patient: new FormControl()
    });
    
    this.allergy = this.fb.group({
      allergy_Code: new FormControl("",Validators.required),
      allergyType: new FormControl("",Validators.required),
      allergyName: new FormControl("",Validators.required),
      description: new FormControl("",Validators.required),
      clinical_Information: new FormControl(""),
      is_allergy_fatal: new FormControl(""),
     // allergytypedetail: new FormControl("", [Validators.required, Validators.minLength(10)]),
    });

    this.getPatientDemographicDetails(this.userId);
    this.getPatientAllergyList();
    this.getPateintAllergyDetails(this.userId);
    // if(localStorage.getItem("PMSUser") == null)
    // {
    //   this.route.navigateByUrl('/');
    // }
  }

  getPatientDemographicDetails(id: number) {
    debugger;
    this.service.getPatientDemographicDetails(id).subscribe((response: PatientDetails) => {
      debugger
      this.patiendetails = response;
      console.log(this.patiendetails);
      this.patientdetail.controls['patientId'].setValue(this.patiendetails.patient_Id);
      this.patientdetail.controls['title'].setValue(this.patiendetails.title);
      this.patientdetail.controls['fname'].setValue(this.patiendetails.firstName);
      this.patientdetail.controls['lname'].setValue(this.patiendetails.lastName);
      let date = this.datepipe.transform(this.patiendetails.dob, "yyyy-MM-dd");
      this.patientdetail.controls['dob'].setValue(date);

      debugger;
      if (this.patiendetails.age == 0) {
        this.ageCalculator();
      }
      else {
        this.age = this.patiendetails.age;
      }

      this.patientdetail.controls['email'].setValue(this.patiendetails.emailId);
      this.patientdetail.controls['gender'].setValue(this.patiendetails.gender);
      this.patientdetail.controls['race'].setValue(this.patiendetails.race);
      this.patientdetail.controls['ethnicity'].setValue(this.patiendetails.ethnicity);
      this.patientdetail.controls['language'].setValue(this.patiendetails.language);
      this.patientdetail.controls['address'].setValue(this.patiendetails.address);
      this.patientdetail.controls['phone'].setValue(this.patiendetails.contactNo);
      this.patientdetail.controls['etitle'].setValue(this.patiendetails.emergency_Title);
      this.patientdetail.controls['efname'].setValue(this.patiendetails.emergency_FirstName);
      this.patientdetail.controls['elname'].setValue(this.patiendetails.emergency_LastName);
      this.patientdetail.controls['erelation'].setValue(this.patiendetails.emergency_Relation);
      this.patientdetail.controls['eEmail'].setValue(this.patiendetails.emergency_EmailId);
      this.patientdetail.controls['ephone'].setValue(this.patiendetails.emergency_ContactNo);
      this.patientdetail.controls['eaddress'].setValue(this.patiendetails.emergency_Address);
      this.patientdetail.controls['address_same_as_patient'].setValue(this.patiendetails.address_Same_As_Patient);
      let allergy;
      if (this.patiendetails.allergy_Details == true) {
        allergy = 1;
      }
      else {
        allergy = 0;
      }
      this.patientdetail.controls['isVisible'].setValue(allergy);
    });
  }

  getPateintAllergyDetails(id: number) {
    debugger;
    this.patientallergyService.getPatientAllergyDetails(id).subscribe((response: PatientAllergy[]) => {
      debugger
      this.allergyList = response;
      console.log(this.allergyList);
    });
  }

  addAllergy() {
    // this.submitAllergy();
    debugger;
    let obj: PatientAllergy = new PatientAllergy(
      this.allergy.value.allergy_Code,
      this.allergy.value.allergyName,
      this.allergy.value.allergyType,
      this.allergy.value.description,
      this.allergy.value.clinical_Information = this.clinicalinformation,
      this.allergy.value.is_allergy_fatal);
    this.isFormSubmitted = true;
    console.log(this.patientdetail.value)
    var fatal = this.allergy.value.is_allergy_fatal;
    obj.is_Allergy_Fatal = fatal;
    if (fatal == "yes") {
      obj.is_Allergy_Fatal = true;
    }
    else {
      obj.is_Allergy_Fatal = false;
    }
    this.allergy.value.clinical_Information = this.clinicalinformation;
    obj.UserId = this.userId;
    obj.allergy_Id = this.allergyArray[0].allergy_Id;
    debugger
    this.allergyList.push(obj);
    this.clearFields();
    this.getPatientAllergyList();
    //let patientDetailsObj: PatientDetails = new PatientDetails();
    // if (patientDetailsObj.Allergy_Details = true) {
    //   debugger;
    //   console.log(this.allergyList);
    //   this.patientallergyService.AddPatientAllergy(this.allergyList).subscribe((response: any) => {
    //     this.patientallergydetails = response;
    //     // this.patiendetails = response
    //     //this.route.navigate(['/patientdetailsview', this.patiendetails]);
    //   });
    // }

  }


  getPatientAllergyList() {

    this.allergyService.getAllAllergy().subscribe((result: Allergy[]) => {
      debugger
      this.allergyArray = result;
      console.log(this.allergyArray);
    });

  }

  filterAllergyListByCode(allergyArray: any) {
    console.log(allergyArray.target.value);
    debugger;
    if (allergyArray.target.value !== "") {
      let data = this.allergyArray.find((e: any) => e.allergy_Code === allergyArray.target.value);
      this.clinicalinformation = data?.allergy_Clinical_Information;
      this.allergy.controls['allergyType'].setValue(data?.allergy_Type);
      this.allergy.controls['allergyName'].setValue(data?.allergy_Name);
      // this.tempallergydata = this.allergyArray.find((e: any) => e.allergy_Code === allergyArray.target.value);
      // this.allergyArray = this.tempallergydata;
      // this.clinicalinformation = this.tempallergydata[0].allergy_Clinical_Information;
      // console.log(this.allergyArray);
    }
    else {
      debugger;
      this.getPatientAllergyList();
      this.allergyArray;
      console.log(this.allergyArray);
    }
  }
  filterAllergyListByType(allergyArray: any) {
    console.log(allergyArray.target.value);
    debugger;
    if (allergyArray.target.value !== "") {
      this.tempallergydata = this.allergyArray.filter((e: any) => e.allergy_Type == allergyArray.target.value);
      this.allergyArray = this.tempallergydata;
      //this.clinicalinformation = this.tempallergydata[0].allergy_Clinical_Information;
      console.log(this.allergyArray);
    }
    else {
      debugger;
      this.getPatientAllergyList();
      this.allergyArray;
      console.log(this.allergyArray);
    }
  }
  filterAllergyListByName(allergyArray: any) {
    console.log(allergyArray.target.value);
    debugger;
    if (allergyArray.target.value !== "") {
      this.tempallergydata = this.allergyArray.filter((e: any) => e.allergy_Name == allergyArray.target.value);
      this.allergyArray = this.tempallergydata;
      this.clinicalinformation = this.tempallergydata[0].allergy_Clinical_Information;
      console.log(this.allergyArray);
    }
    else {
      debugger;
      this.getPatientAllergyList();
      this.allergyArray;
      console.log(this.allergyArray);
    }
  }

  frm_patientDetailsSubmit_click() {
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
      patientDetailsObj.UserId = this.userId;
      patientDetailsObj.Address_Same_As_Patient = this.patientdetail.value.address_same_as_patient;
      var str = this.patientdetail.value.isVisible;
      patientDetailsObj.Allergy_Details = str;
      if (str == true) {
        patientDetailsObj.Allergy_Details = true;
      }
      else {
        patientDetailsObj.Allergy_Details = false;
      }
      // var str1 = this.access_to_patientPortal
      // patientDetailsObj.Access_To_Patient_Portal = str1;
      // if (str1 == true) {
      //   patientDetailsObj.Access_To_Patient_Portal = true;
      // }
      // else {
      //   patientDetailsObj.Access_To_Patient_Portal = false;
      // }

    if (this.patientdetail.valid && patientDetailsObj.Patient_Id == 0) {
      debugger;
            this.service.AddPatientDetails(patientDetailsObj).subscribe((response: any) => {
        this.patiendetails = response;
        if (patientDetailsObj.Allergy_Details = true) {
          debugger;
          this.onsubmitClick_AddAllergyList();
        }
        this.route.navigate(['/patientdetailsview', this.patiendetails]);
        this.notify.success("Your Data is saved Successfully", "Success");
      });
    }
    else {
      this.service.updatePatientDetails(patientDetailsObj.Patient_Id, patientDetailsObj).subscribe((response: any) => {
        this.patiendetails = response;
        console.log(this.patiendetails);
        this.onsubmitClick_AddAllergyList();
        this.route.navigate(['/patientdetailsview', patientDetailsObj.Patient_Id]);
        this.notify.success("Your Data is saved Successfully", "Success");
      });
    }
  }
  onsubmitClick_AddAllergyList() {
    debugger;
    console.log(this.allergyList);
    this.patientallergyService.AddPatientAllergy(this.allergyList).subscribe((response: any) => {
      this.patientallergydetails = response;
      console.log(this.patientallergydetails);
    });
  }

  deleteAllergy(id: number) {
    debugger
    let index: number = this.allergyList.findIndex((x: any) => x.patient_Allergy_Id = id);
    this.allergyList.splice(index, 1);

    // this.patientallergyService.deletePatientAllergy(id).subscribe((response: any) => {
    //   console.log(response);
    //   response = this.allergyList;     
    // });

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



  clearFields() {
    this.allergy.controls['allergy_Code'].setValue("");
    this.allergy.controls["allergy_Code"].setErrors(null);

    this.allergy.controls['allergyName'].setValue("");
    this.allergy.controls["allergyName"].setErrors(null);

    this.allergy.controls['allergyType'].setValue("");
    this.allergy.controls["allergyType"].setErrors(null);

    this.allergy.controls['description'].setValue("");
    this.allergy.controls["description"].setErrors(null);

    this.allergy.controls['clinical_Information'].setValue("");
    this.clinicalinformation=""
    this.allergy.controls["clinical_Information"].setErrors(null);

    this.allergy.controls['is_allergy_fatal'].setValue("");
    this.allergy.controls["is_allergy_fatal"].setErrors(null);

    this.getPatientAllergyList();
  }

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
      this.patientdetail.value.address_same_as_patient = true;
      this.patientdetail.value.eaddress = this.patientdetail.value.address
    }
    else {
      this.patientdetail.value.eaddress = "";
    }
  }
  btnCancel_click() {
    this.route.navigate(["/patient-dashboard"]);
  }


}
