export class Appointment
{
    AppointmentId:number = 0;
    Title:string="";
    AppointmentDate:Date = new Date();
    AppointmentTime:string = "";
    Reason: string = "";
    SchedularId:number = 0;
    PhysicianId:number = 0;
    NurseId:number = 0;
    PatientId : number = 0;
    PhysicianName:string = "";
    PatientName : string = "";
    CreatedOn:Date = new Date();
    ModifiedOn:Date = new Date();
    IsActive:boolean=true;
    Status:string="";
    DeclineReason:string="";
}


export class RegisteredUserAppoint
{
    userId:number = 0;
    title:string = "";
    firstName:string = "";
    lastName:string = "";
    emailId:string = "";
    DOB:Date = new Date();
    contactNo:string = "";
    employeeId:number=0;
    role:string="";
    name:string="";
}