import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { GuestsPipe } from './guests.pipe';
import { ExpiredPipe } from './expired.pipe';
import { CartTotalPipe } from './cart-total.pipe';
import { PedidosPipe } from './pedidos.pipe';
import { SecurePipe } from './secure.pipe';
import { PercentPipe } from './percent.pipe';

@NgModule({
	declarations: [SearchPipe, GuestsPipe, ExpiredPipe, CartTotalPipe, PedidosPipe, SecurePipe, PercentPipe],
	imports: [],
	exports: [SearchPipe, GuestsPipe, ExpiredPipe, CartTotalPipe, PedidosPipe, SecurePipe, PercentPipe]
})
export class PipesModule {}
