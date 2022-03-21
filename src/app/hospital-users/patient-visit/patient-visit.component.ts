import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/Services/custom-validation.service';
import { ToastrService } from 'ngx-toastr';
import { DiagnosisService } from 'src/app/Services/diagnosis.service';
import {diagnosis, Diagnosisforcode } from 'src/app/models/diagnosis';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientVisitDetailService } from 'src/app/Services/patient-visit-detail.service';
import { patientVital } from 'src/app/models/patient_vitaldata';
import { HttpErrorResponse } from '@angular/common/http';
import { Procedure, Procedureforcode } from 'src/app/models/procedure';
import { ProcedureService } from 'src/app/Services/procedure.service';
import { identifierName } from '@angular/compiler';
import { PatientVisitDiagnosis } from 'src/app/models/patientvisit_diagnosis';
import { drug, drugforCode } from 'src/app/models/drug';
import { DrugService } from 'src/app/Services/drug.service';
import { PatientVisitProcedure } from 'src/app/models/PatientVisitProcedure';

import { PatientDetailsService } from 'src/app/Services/patient-details.service';
import { PatientDetails, PatientDetailsforDetail } from 'src/app/models/patient-detail';

import { PatientVisitMedication } from 'src/app/models/PatientVisitMedication';
import { AllergyService } from 'src/app/Services/allergy.service';
import { PatientAllergyService } from 'src/app/Services/patient-allergy.service';
import { PatientAllergy } from 'src/app/models/Patient-Allergy';
import { PatientRegService } from 'src/app/Services/patient-reg.service';



@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements OnInit {

  visitId:number=0;
  patientId=0;
  activeTab = 'custom-tabs-five-Patient-details';
  constructor(private route:Router,private CustomValidators:CustomValidationService ,
              private notify:ToastrService,private digService:DiagnosisService,
              private visitService:PatientVisitDetailService,
              private procedureService:ProcedureService, 
              private drugServices:DrugService,
              private patientDetails:PatientDetailsService,
              private allergyService: PatientAllergyService,
              private regService:PatientRegService) { }

  ngOnInit(): void {
    this.getdiagnosisCodeAndDescription();
    this.getProcedureCodeAndDescription();
    this.getdrugInfo(),
    this.getPatientName()
  }
  
  
  
//-----------------Patient  Vital Details----------------------------------------------------

  patientvisitdetail_vital:FormGroup = new FormGroup({

    Id: new FormControl(""),
    height: new FormControl("", [Validators.required, Validators.max(250)]),
    weight: new FormControl("", [Validators.required,Validators.pattern("^\\d+(?:\\.\\d{1,2})?$")]),
    bodytemperature: new FormControl("", Validators.required),
    respirationrate : new FormControl("", Validators.required),
    bloodpressure : new FormControl("", Validators.required),
    note : new FormControl(""),
  });

  //------------------------------Patient  Diagnosis Details----------------------------------------------------
 
  diagnosisArray :Diagnosisforcode[] =[];

  patientvisitdetail_diagnosis:FormGroup = new FormGroup({
    diagnosisId:new FormControl(""),
    diagnosiscode:new FormControl("", Validators.required),
    diagnosisdescription: new FormControl("", Validators.required),
    procedureisdepriciated:new FormControl("", Validators.required),
    note:new FormControl(""),

  })

  ListDiagnosisArray:Diagnosisforcode[]=[];
  DescDiagnosis:any;
  CodeDiagnosis:any;
  
  diagnosisId:any;
  isDeprecated!:boolean;
  
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  

  displayedColumns_Diagnosis = ['diagnosiscode', 'diagnosisdescription', 'procedureisdepriciated','Actions'];
  dataSource :any;  
  //diagnosisArray :any;

  getdiagnosisCodeAndDescription()
  {
    this.digService.getAllDiagnosis().subscribe((digcode) => {
      this.ListDiagnosisArray = digcode;
      //console.log(this.ListDiagnosisArray);    
      // console.log(this.ListDiagnosisCode[0].diagnosis_Code)   
      // console.log(this.ListDiagnosisCode[0].diagnosis_Description)
      // console.log(this.ListDiagnosisCode[0].diagnosis_Is_Depricated)           
    })
  }

  setDiagnosisDescription(event : any)
  {
    let data = this.ListDiagnosisArray.find((x) => x.diagnosis_Code === event.target.value);
    this.DescDiagnosis=data?.diagnosis_Description;
    this.CodeDiagnosis=data?.diagnosis_Code;
    this.diagnosisId = data?.diagnosis_Id;
    this.patientvisitdetail_diagnosis.controls["diagnosisId"].setValue(this.diagnosisId);

    // console.log(data?.diagnosis_Description)
     //console.log(event.target.value);
      // console.log(data?.diagnosis_Description);
      
  }
  setDiagnosisCode(event:any)
  {
    let data = this.ListDiagnosisArray.find((x) => x.diagnosis_Description === event.target.value);
    this.CodeDiagnosis=data?.diagnosis_Code;
    this.diagnosisId = data?.diagnosis_Id;
    this.patientvisitdetail_diagnosis.controls["diagnosisId"].setValue(this.diagnosisId);
    
    console.log(data?.diagnosis_Code)
    console.log(data?.diagnosis_Description)
    
  }
  
  addDiangnosis()
  {
    debugger;
     let dignosisObj:Diagnosisforcode = new Diagnosisforcode;
     dignosisObj.visit_Id = this.visitId;
     dignosisObj.diagnosis_Id = this.patientvisitdetail_diagnosis.value.diagnosisId;
     dignosisObj.diagnosis_Code = this.patientvisitdetail_diagnosis.value.diagnosiscode;
     dignosisObj.diagnosis_Description = this.patientvisitdetail_diagnosis.value.diagnosisdescription;
     if(this.patientvisitdetail_diagnosis.value.procedureisdepriciated == "true")
     {
       dignosisObj.diagnosis_Is_Depricated = true;
     }
     else
     {
      dignosisObj.diagnosis_Is_Depricated = false;
     }
     dignosisObj.note = this.patientvisitdetail_diagnosis.value.note;

     this.diagnosisArray.push(dignosisObj);

     this.dataSource = new MatTableDataSource(this.diagnosisArray);
     this.dataSource.sort=this.sort; 
     this.dataSource.paginator = this.paginator;

     this.cleardiagnosistabFields();
  }

  deleteDiagnosis(code:string){
      debugger;
      let index:number = this.diagnosisArray.findIndex(d=>d.diagnosis_Code == code);
      this.diagnosisArray.splice(index,1);

     this.dataSource = new MatTableDataSource(this.diagnosisArray);
     this.dataSource.sort=this.sort; 
     this.dataSource.paginator = this.paginator;
  }

  //------------------------------Patient Procedure Details----------------------------------------------------

  procedureArray :Procedureforcode[] =[];
 
   
  patientvisitdetail_procedure:FormGroup = new FormGroup({
    procedureId:new FormControl("", Validators.required),
    procedurecode:new FormControl("", Validators.required),
    proceduredescription:new FormControl("", Validators.required),
    procedureisdepriciated:new FormControl("", Validators.required),
    note:new FormControl(""),
    
  })

  ListProcedureArray:Procedureforcode[]=[];
  DescProcedure:any;
  CodeProcedure:any;
  procedureId:any;

  displayedColumns_procedure = ['procedurecode', 'proceduredescription', 'procedureisdepriciated','Actions'];
  dataSource1 :any;

  getProcedureCodeAndDescription()
  {
    this.procedureService.getProcedurList().subscribe((proccode) => {
      this.ListProcedureArray = proccode;
      //console.log(this.ListProcedureArray);    
       //console.log(this.ListProcedureArray[0].procedure_Code)   
                 
    })
  }

  setProcedureCode(event:any)
  {
    let data = this.ListProcedureArray.find((x) => x.procedure_Description === event.target.value);
    this.CodeProcedure=data?.procedure_Code;
    this.procedureId=data?.procedure_ID;
    this.patientvisitdetail_procedure.controls["procedureId"].setValue(this.procedureId);

    console.log(data?.procedure_Code)
    //console.log(data?.diagnosis_Description)
    
  }

  setProcedureDescription(event:any)
  {
    let data = this.ListProcedureArray.find((x) => x.procedure_Code === event.target.value);
    this.DescProcedure=data?.procedure_Description;
    this.CodeProcedure=data?.procedure_Code;
    console.log(event.target.value);  
    this.procedureId=data?.procedure_ID;
    this.patientvisitdetail_procedure.controls["procedureId"].setValue(this.procedureId);
    
     console.log(data?.procedure_Description)
     console.log(data?.procedure_Code);
  }

  addProcedure()
  {
    debugger;
     let procedureObj:Procedureforcode = new Procedureforcode;
     procedureObj.visit_ID = this.visitId;
     procedureObj.procedure_ID = this.patientvisitdetail_procedure.value.procedureId;
     procedureObj.procedure_Code = this.patientvisitdetail_procedure.value.procedurecode;
     procedureObj.procedure_Description = this.patientvisitdetail_procedure.value.proceduredescription;
     if(this.patientvisitdetail_procedure.value.procedureisdepriciated == "true")
     {
      procedureObj.procedure_Is_Depricated = true;
     }
     else
     {
      procedureObj.procedure_Is_Depricated = false;
     }
     
     procedureObj.note = this.patientvisitdetail_procedure.value.note;
     this.procedureArray.push(procedureObj);

     this.dataSource1 = new MatTableDataSource(this.procedureArray);
     this.dataSource1.sort=this.sort; 
     this.dataSource1.paginator = this.paginator;
     this.clearproceduretabFields();
  }

  deleteProcedure(code:string){
    debugger;
    let index:number = this.procedureArray.findIndex(d=>d.procedure_Code == code);
    this.procedureArray.splice(index,1);

   this.dataSource1 = new MatTableDataSource(this.procedureArray);
   this.dataSource1.sort=this.sort; 
   this.dataSource1.paginator = this.paginator;
}


  //------------------------------Patient  Medication Details----------------------------------------------------
  MedicationArray:drugforCode[]=[];
  Drug_ID :any;
  Drug_Name :any;
  Drug_Generic_Name:any
  Drug_Brand_Name:any
  Drug_Form:any
  Dosage:any;

  displayedColumns_medication = ['drugid', 'drugname', 'druggenericname','drugbrandname','drugform','Action'];
  dataSource2 :any;
  drugList:drugforCode[] = [];

  patientvisitdetail_medication:FormGroup = new FormGroup({
    
    drugid:new FormControl("", Validators.required),
    drugname:new FormControl("", Validators.required),
    druggenericname:new FormControl("", Validators.required),
    drugbrandname:new FormControl("", Validators.required),
    drugform: new FormControl("", Validators.required),
    dosage: new FormControl(""),
    note: new FormControl("")
  })
  getdrugInfo()
  {
    this.drugServices.getAllDrugs().subscribe((proccode) => {
      this.drugList = proccode;
      //console.log(this.drugList);    
          
                 
    })
  }

  addMedication()
  {
    debugger;
     let medicationObj:drugforCode = new drugforCode;
     medicationObj.visit_ID = this.visitId;
     medicationObj.drug_ID = this.patientvisitdetail_medication.value.drugid;
     medicationObj.drug_Name = this.patientvisitdetail_medication.value.drugname;
     medicationObj.drug_Generic_Name = this.patientvisitdetail_medication.value.druggenericname;
     medicationObj.drug_Manufacture_Name = this.patientvisitdetail_medication.value.drugbrandname;
     medicationObj.drug_Form = this.patientvisitdetail_medication.value.drugform;
     medicationObj.drug_Form = this.patientvisitdetail_medication.value.drugform;
     medicationObj.dosage = this.patientvisitdetail_medication.value.dosage;
     medicationObj.note = this.patientvisitdetail_medication.value.note;
     this.MedicationArray.push(medicationObj);
     this.dataSource2 = new MatTableDataSource(this.MedicationArray);
     this.dataSource2.sort=this.sort; 
     this.dataSource2.paginator = this.paginator;
     this.clearmedicationtabFields();

  }


  setValueOnSelectionDrugId(event: any)
  {
    console.log("im in set value at drug value function")
    console.log(event.target.value);
    console.log(this.drugList)
    let data = this.drugList.find((x) => x.drug_ID == event.target.value);
    console.log(data)

     this.Drug_ID=data?.drug_ID;
     this.Drug_Name=data?.drug_Name;
     this.Drug_Generic_Name=data?.drug_Generic_Name;
     this.Drug_Brand_Name=data?.drug_Manufacture_Name;
     this.Drug_Form=data?.drug_Form;
     
     //console.log(event.target.value);
     console.log(data?.drug_ID)
     console.log(data?.drug_Name)
       
  }

  setdrugIdOnSelectionofdrugNameAndDrugForm(event:any)
  {
    
    let data=this.drugList.find((x) =>x.drug_Form===event.target.value && x.drug_Name===event.target.value );
    this.Drug_ID=data?.drug_ID
    console.log(data?.drug_ID);
  }

  setOnDrugName(event:any)
  {
    let data=this.drugList.find((x) =>x.drug_Name==event.target.value );
    this.Drug_ID=data?.drug_ID
    this.Drug_Generic_Name=data?.drug_Generic_Name,
    this.Drug_Brand_Name=data?.drug_Manufacture_Name,
    this.Drug_Form=data?.drug_Form;

    console.log(data?.drug_Generic_Name);
  }
//---------------------------------------------------------Get Patient Details------------------------------------

patientDetailObj:PatientDetailsforDetail[]=[];
PatientFullName:string="";
fname:string="";
age:number=0;
lname: string="";
email:string="";
dob:string = "";
gender:string="";
race:any;
ethinicity:any;
language:any;
address:any;
contactNo:any;

efname:any;
elname:any;
erelation:any;
eEmail:any;
eContactNo:any
eAddress:any;
allergyList: any = [];
patientList: any = [];

isVisible: any;
isSelected: boolean = false;
pArray: any = [];

showTableOnSelection(event: any): void
{
  if(this.patientList.name ===event.target.value)
  
  console.log(this.patientList.name )
     this.isSelected=true;  
}

getPatientName()
{
  this.regService.getAllPatient().subscribe((getList)=> {
    debugger;
    this.patientList = getList;
  })
}

filterPatientListById(PatientArray: any) {
  debugger;
  console.log(PatientArray.target.value);
  debugger;
  if (PatientArray.target.value !== "") {
    let data = this.patientList.find((e: any) => e.name === PatientArray.target.value);
    this.getPatientDemographicDetails(data.userId);
    this.getPatientAllergyDetails(data.userId);    
    this.isSelected=true;  
  }
  else {
    debugger;    
    this.isSelected=false; 
  }
  
}

getPatientDemographicDetails(id: number) {
  debugger;
  this.patientDetails.getPatientDemographicDetails(id).subscribe((response:any) => {
    debugger
    
    this.patientId = response.userId;
    this.fname = response.firstName;
    this.lname = response.lastName;
    this.email = response.emailId;
    this.dob = response.dob;
    this.age = response.age;
    this.gender = response.gender;
    this.race = response.race;
    this.ethinicity = response.ethnicity;
    this.contactNo = response.contactNo;
    this.address = response.address;
    this.language = response.language;
    this.efname = response.emergency_FirstName;
    this.elname = response.emergency_LastName;
    this.eEmail = response.emergency_EmailId;
    this.eContactNo = response.emergency_ContactNo;
    this.erelation = response.emergency_Relation;
    this.eAddress = response.emergency_Address;
  });
}

getPatientAllergyDetails(id: number) {
  debugger;
  this.allergyService.getPatientAllergyDetails(id).subscribe((response: PatientAllergy[]) => {
    debugger
    this.allergyList = response;
    console.log(this.allergyList);
  });
}

// setAllDetailByPatientFirstName(name:any)
// {
//   let data=this.patientDetailObj.find((x) =>x.firstName==name.target.value );
  
//   this.FirstName=data?.firstName;
//   this.Age=data?.age;
//   this.Gender=data?.gender;
//   this.lastName=data?.lastName;
//   this.DOB=data?.dob;
//   this.Race=data?.race;
//   this.Ethinicity=data?.ethnicity;
//   this.LanguageKnown=data?.language;
//   this.Email=data?.emailId;
//   this.Address=data?.address;
//   this.ContactNo=data?.address;
//   this.EmgFirstName=data?.emergency_FirstName;
//   this.EmgLastName=data?.emergency_LastName;
//   this.Relationship=data?.emergency_Relation;
//   this.EmgEmail=data?.emergency_EmailId;
//   this.EmgContactNo=data?.emergency_ContactNo;
//   this.EmgContactAddress=data?.emergency_Address




//   console.log(data?.firstName)
  
// }

  deleteMedication(id:number){
    debugger;
    let index:number = this.MedicationArray.findIndex(d=>d.drug_ID == id);
    this.MedicationArray.splice(index,1);

   this.dataSource2 = new MatTableDataSource(this.MedicationArray);
   this.dataSource2.sort=this.sort; 
   this.dataSource2.paginator = this.paginator;
  }


//----------------------------------------------------------------------------------------------------------------
  submitForm()
    {
      //this.notify.success("Status Updated Successfully","Success");
    }
  btnCancel_click()
    {

    }

    
  cleardiagnosistabFields(){
   debugger
   this.patientvisitdetail_diagnosis.controls["diagnosiscode"].setValue("");
   this.patientvisitdetail_diagnosis.controls["diagnosiscode"].setErrors(null);
   this.patientvisitdetail_diagnosis.controls["diagnosisdescription"].setValue("");
   this.patientvisitdetail_diagnosis.controls["procedureisdepriciated"].setValue("");
   this.patientvisitdetail_diagnosis.controls["note"].setValue("");
  }
clearproceduretabFields(){
   
   this.patientvisitdetail_procedure.controls["procedurecode"].setValue("");
   this.patientvisitdetail_procedure.controls["procedurecode"].setErrors(null);
   this.patientvisitdetail_procedure.controls["proceduredescription"].setValue("");
   this.patientvisitdetail_procedure.controls["procedureisdepriciated"].setValue("");
   this.patientvisitdetail_procedure.controls["note"].setValue("");
  }

  clearmedicationtabFields()
  {
    this.patientvisitdetail_medication.controls["drugid"].setValue("");
    this.patientvisitdetail_medication.controls["drugid"].setErrors(null);
    this.patientvisitdetail_medication.controls["drugname"].setValue("");
    this.patientvisitdetail_medication.controls["druggenericname"].setValue("");
    this.patientvisitdetail_medication.controls["drugbrandname"].setValue("");
    this.patientvisitdetail_medication.controls["drugform"].setValue("");
    this.patientvisitdetail_medication.controls["dosage"].setValue("");
    this.patientvisitdetail_medication.controls["note"].setValue("");
  }
  clearvitaltabFields(){
   
    this.patientvisitdetail_vital.controls["height"].setValue("");
    this.patientvisitdetail_vital.controls["weight"].setValue("");
    this.patientvisitdetail_vital.controls["bodytemperature"].setValue("");
    this.patientvisitdetail_vital.controls["respirationrate"].setValue("");
    this.patientvisitdetail_vital.controls["bloodpressure"].setValue("");
    this.patientvisitdetail_vital.controls["note"].setValue("");
   }


  vitaldata_click(){
    debugger;

    let visitObj:patientVital = new patientVital();
    visitObj.Visit_Date = new Date();
    visitObj.UserId = this.patientId;
    visitObj.Height = this.patientvisitdetail_vital.value.height;
    visitObj.Weight = this.patientvisitdetail_vital.value.weight;
    visitObj.Blood_Pressure = this.patientvisitdetail_vital.value.bloodpressure;
    visitObj.Body_Temperature = this.patientvisitdetail_vital.value.bodytemperature;
    visitObj.Respiration_Rate = this.patientvisitdetail_vital.value.respirationrate;
    visitObj.Note = this.patientvisitdetail_vital.value.note;

    this.visitService.AddvitalData(visitObj).subscribe( (result:any)=> {
        this.notify.success("Saved Successfully");        
        this.tab("custom-tabs-five-diagnosis");
        this.clearvitaltabFields();
        this.visitId = result;
    },
    (error:HttpErrorResponse)=> {
      this.notify.error(error.error,"Error");
    });
  }

  diagnosis_submit_click(){
    
      debugger;
      if(this.diagnosisArray.length == 0){
        this.notify.error("add diagnosis data","error");       
      }
      else
      {
        let diagnosisObjlist:PatientVisitDiagnosis[] = [];
          
        for(var item of this.diagnosisArray){         
          let diagnosisdt:PatientVisitDiagnosis = new PatientVisitDiagnosis();
          diagnosisdt.Visit_Id = item.visit_Id;
          diagnosisdt.Diagnosis_Id = item.diagnosis_Id;
          diagnosisdt.Description = item.diagnosis_Description;
          diagnosisdt.Note = item.note;
          diagnosisObjlist.push(diagnosisdt);
        }

        this.visitService.addDignosisData(diagnosisObjlist).subscribe( (result:any)=> {
          this.notify.success("Saved Successfully");        
          this.tab("custom-tabs-five-procedure");       
        });
      }
  }

  procedure_submit_click(){
    debugger;
      if(this.procedureArray.length == 0){
        this.notify.error("add procedure data","error");       
      }
      else
      {
        let procedureObjlist:PatientVisitProcedure[] = [];
          
        for(var item of this.procedureArray){         
          let proceduredt:PatientVisitProcedure = new PatientVisitProcedure();
          proceduredt.Visit_Id = item.visit_ID;
          proceduredt.Procedure_Id = item.procedure_ID;
          proceduredt.Description = item.procedure_Description;
          proceduredt.Note = item.note;
          procedureObjlist.push(proceduredt);
        }

        this.visitService.addProcedureData(procedureObjlist).subscribe( (result:any)=> {
          this.notify.success("Saved Successfully");        
          this.tab("custom-tabs-five-medication");       
        });
      } 
  }


 

  medication_submit_click(){
    debugger;
    
      if(this.MedicationArray.length == 0){
        this.notify.error("add medication data","error");       
      }
      else
      {
        let medicationObjlist:PatientVisitMedication[] = [];
          
        for(var item of this.MedicationArray){         
          let medicationdt:PatientVisitMedication = new PatientVisitMedication();
          medicationdt.Visit_Id = item.visit_ID;
          medicationdt.Drug_Id = item.drug_ID;
          medicationdt.Description = "";
          medicationdt.Dosage = item.dosage;
          medicationdt.Note = item.note;          
          medicationObjlist.push(medicationdt);
        }

        this.visitService.addMedicationeData(medicationObjlist).subscribe( (result:any)=> {
          this.route.navigateByUrl("/patientvisithistory")
          this.notify.success("Saved Successfully");
        });
      } 
  }


  tab(activeTab:string){
    this.activeTab = activeTab;
  }

  tab1_next(activeTab:string){
    this.activeTab = activeTab;
  }

  tab1_cancel(){
    this.route.navigateByUrl("/physician-dashboard");
  }
}
