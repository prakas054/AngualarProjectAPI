export class Procedure
	{
		Procedure_ID:number =0;
		Procedure_Code:string="";
		Procedure_Description:string="";
		Procedure_Is_Depricated:boolean=false;			
	}

	export class Procedureforcode
	{
		visit_ID:number =0;
		procedure_ID:number =0;
		procedure_Code:string="";
		procedure_Description:string="";
		procedure_Is_Depricated:boolean=false;
		note:string="";

	}