import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usermgmtfilter'
})
export class UsermgmtfilterPipe implements PipeTransform {

  transform(inputData:any[],key:string,value:string): any[] {
    debugger;
    let output:any[]=[];
    if(key !="" && value !=""){
      if(key == 'name'){      
        
        output = inputData.filter(x=> x[key].toString().toUpperCase().includes(value.toUpperCase()));  
      }
      else
      {
        output = inputData.filter(x=> x[key].toString().toUpperCase() == value.toUpperCase());  
      }      
    }
    else{
        output = inputData;
    }
    return output;
  }

}
