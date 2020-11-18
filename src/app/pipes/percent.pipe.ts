import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent'
})
export class PercentPipe implements PipeTransform {

  transform(value: any): any {

  	let users = value.users.length;
  	let participations = value.participations;
    return ((users * 100) / participations).toFixed(0);
  }

}
