import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guests',
  pure: false
})
export class GuestsPipe implements PipeTransform {

  transform(value: any, guest): unknown {
  	let result = value.findIndex(x=>x==guest) != -1;
    return result;
  }

}
