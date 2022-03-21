export class AppointmentListByUser{
    AppointmentId:number=0;
    Title:string="";
    AppointmentDate:Date = new Date();
    AppointmentTime:string="";
    Reason:string="";
    PhysicianName:string="";
    PatientName:string="";
}

export class AppointmentListByUserForWeek{
    appointmentId:number=0;
    title:string="";
    appointmentDate:Date = new Date();
    appointmentTime:string="";
    reason:string="";
    physicianName   :string="";
    PatientName:string="";
    status:string="";
}