import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { GuestsPipe } from './guests.pipe';
import { ExpiredPipe } from './expired.pipe';
import { CartTotalPipe } from './cart-total.pipe';
import { PedidosPipe } from './pedidos.pipe';
import { SecurePipe } from './secure.pipe';
import { PercentPipe } from './percent.pipe';
import { StarPipe } from './star.pipe';
import { PreferencesPipe } from './preferences.pipe';
import { DistancePipe } from './distance.pipe';

@NgModule({
	declarations: [SearchPipe, GuestsPipe, ExpiredPipe, CartTotalPipe, PedidosPipe, SecurePipe, PercentPipe, StarPipe, PreferencesPipe, DistancePipe],
	imports: [],
	exports: [SearchPipe, GuestsPipe, ExpiredPipe, CartTotalPipe, PedidosPipe, SecurePipe, PercentPipe, StarPipe, PreferencesPipe, DistancePipe]
})
export class PipesModule {}
