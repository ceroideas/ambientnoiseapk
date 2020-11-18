import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartTotal',
  pure: false
})
export class CartTotalPipe implements PipeTransform {

  transform(value: any): unknown {
  	let total = 0;
  	for (let i in value.products) {
  		total+=value.products[i].quantity*value.products[i].price;
  	}
    return total;
  }

}
