export class PatientAllergy
	{
		patient_Allergy_Id:number =0;
		UserId:number=0;
		allergy_Id:number=0;
		allergy_Code:number=0;
		allergy_Type:string="";
        allergy_Name:string="";
		description:string="";
		clinical_Information:string="";
		is_Allergy_Fatal:boolean=false;

		constructor(Allergy_Code = 0, Allergy_Type = "", Allergy_Name = "", Allergy_Description = "", Allergy_Clinical_Information = "", allergy_IsFatal:boolean) {
			this.allergy_Code = Allergy_Code;
			this.allergy_Type = Allergy_Type;
			this.allergy_Name = Allergy_Name;
			this.description = Allergy_Description;
			this.clinical_Information = Allergy_Clinical_Information;
			this.is_Allergy_Fatal = allergy_IsFatal;
		}
	}