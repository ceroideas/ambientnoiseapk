import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: any): any {
  	if (value < 1) {
  		return (value*1000).toFixed(2)+' m';
  	}else{
  		return value.toFixed(2)+' km';
  	}
    return "0 m";
  }

}
