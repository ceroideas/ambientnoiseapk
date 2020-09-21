import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { GuestsPipe } from './guests.pipe';

@NgModule({
	declarations: [SearchPipe, GuestsPipe],
	imports: [],
	exports: [SearchPipe, GuestsPipe]
})
export class PipesModule {}
