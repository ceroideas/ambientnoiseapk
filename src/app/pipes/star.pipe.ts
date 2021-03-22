import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'star'
})
export class StarPipe implements PipeTransform {

  transform(value: any, min) {
  	min = parseInt(min);
  	value = parseFloat(value);
    if(value > min && value < min+1) {
    	return 'star-half';
    }
    else if (value > min) {
    	return 'star';
    }
    else {
    	return 'star-outline';
    }
  }

}
