import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guests',
  pure: false
})
export class GuestsPipe implements PipeTransform {

  transform(value: any, guest, type = null): any {
     if (type == 'lists') {
       return value.filter(x=>x.host_id == guest);
     }

    if (type == 'users') {
      let users = value.find(x=>x.user_id == guest);
      return users;
    }

  	if (type == 'list') {
  		let result = value.users.findIndex(x=>x.user_id==guest) != -1;
    	if (result) {
    		return 'Abandonar lista';
    	}else{
    		return 'Inscribirse en lista';
    	}
  	}
    if (type == 'guest') {
      let result = value.users.findIndex(x=>x.user_id==guest) != -1;
      return result;
    }

  	let result = value.findIndex(x=>x==guest) != -1;
    return result;
  }

}
