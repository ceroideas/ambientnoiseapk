import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preferences',
  pure: false
})
export class PreferencesPipe implements PipeTransform {

  transform(value: any, match) {
  	if (value) {
    	return value.find(x=>x==match);
  	}
  	return null;
  }

}
