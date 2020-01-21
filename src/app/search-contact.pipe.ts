import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchContact'
})
export class SearchContactPipe implements PipeTransform {

    transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.firstName.toLocaleLowerCase().includes(args)) 
      || (val.email.toLocaleLowerCase().includes(args) 
      || (val.lastName.toLocaleLowerCase().includes(args)));
      return rVal;
    })

  }

}
