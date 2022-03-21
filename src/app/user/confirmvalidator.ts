import { FormGroup } from "@angular/forms";

export function confirmvalidator(controlName1:string, controlName2:string)
{
      return(formGroup : FormGroup) => {
          debugger;
          let control1 = formGroup.controls[controlName1];
          let control2 = formGroup.controls[controlName2];

          if(control1.value != control2.value){
              control2.setErrors({confirmvalidator:true});
          }
          else{
              control2.setErrors(null);
          }
      }
}