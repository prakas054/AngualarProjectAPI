import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTransform'
})
export class BooleanTransformPipe implements PipeTransform {

  transform(input:boolean): string {
    let output:string="";
    if(input == true) output = "Yes";
    if(input == false) output = "No";
    return output;
  }

}
