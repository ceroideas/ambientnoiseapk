import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'expired'
})
export class ExpiredPipe implements PipeTransform {

  transform(value: any, type = null): unknown {

    moment.locale('es');

  	if (type == 'diff') {
  		return moment(value.date_to).diff(moment(),'days');
  	}
  	if (type == 'created_at') {
  		return moment(value.created_at).format('YYYY/MM')
  	}
    if (type == 'local') {
      return moment(value.date_from).format('dddd DD MMMM YYYY')
    }
    if (type == 'date') {
      return moment(value).format('dddd DD MMMM YYYY')
    }
    if (type == 'hour') {
      return moment(value).format('DD MMMM YYYY HH:mm')
    }

    if (type == 'reserve') {
      let time = moment(value.date+' '+value.hour_from+':'+value.minute_from);

      return time.diff(moment(),'minutes') < 0;
    }
    return null;
  }

}
