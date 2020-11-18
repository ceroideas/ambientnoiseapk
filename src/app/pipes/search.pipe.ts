import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, query: string, type = null): unknown {

  	if (type == 'category') {
  		let f = value.find(x=>x.id == query);
  		if (f) {
  			return f.title;
  		}
  		return 'Todos';
  	}

  	if(!value)return null;
    if(!query)return value;

    query = query.toLowerCase();

    return value.filter(function(item){
        return JSON.stringify(item).toLowerCase().includes(query);
    });
  }

}
