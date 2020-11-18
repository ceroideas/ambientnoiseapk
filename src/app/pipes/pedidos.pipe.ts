import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidos'
})
export class PedidosPipe implements PipeTransform {

  transform(value: any, type, selected): any {
    
    if (type == 'carrito') {
    	if(!value)return null;
	    if(selected == 0)return value;

	    return value.filter(x=>x.status == selected);
    }
    if (type == 'ropero') {
    	if(!value)return null;
	    if(selected == -1)return value;

	    return value.filter(x=>x.status == selected);
    }

  }

}
