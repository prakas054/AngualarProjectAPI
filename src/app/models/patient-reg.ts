export class PatientReg{
  UserId:number = 0;
  Title:string = "";
  FirstName:string = "";
  LastName:string = "";
  EmailId:string = "";
  DOB:Date = new Date();
  ContactNo:string = "";
  Password:string ="";
  IsActive:boolean=true;
  LoginAttempts:number=0;
  Is_SetDefault:boolean=true;
  EmployeeId:number=0;
  Role:string="";
  Status:string="";
}