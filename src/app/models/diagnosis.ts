export class diagnosis{
    Diagnosis_Id:number=0;
    Diagnosis_Code:string="";
    Diagnosis_Description:string="";
    Diagnosis_Is_Depricated:boolean=true;
}

export class Diagnosisforcode{
    visit_Id:number=0;
    diagnosis_Id:number=0;
    diagnosis_Code:string="";
    diagnosis_Description:string="";
    diagnosis_Is_Depricated:boolean=true;
    note:string="";
}