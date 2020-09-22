import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomeTutorialComponent } from './tutoriales/home-tutorial/home-tutorial.component';
import { DetallesTutorialComponent } from './tutoriales/detalles-tutorial/detalles-tutorial.component';

import { OfertasTutorialComponent } from './tutoriales/ofertas-tutorial/ofertas-tutorial.component';
import { EventosTutorialComponent } from './tutoriales/eventos-tutorial/eventos-tutorial.component';
import { FavoritosTutorialComponent } from './tutoriales/favoritos-tutorial/favoritos-tutorial.component';
import { ChatTutorialComponent } from './tutoriales/chat-tutorial/chat-tutorial.component';

@NgModule({
	declarations: [
		HomeTutorialComponent,
		DetallesTutorialComponent,
		OfertasTutorialComponent,
		EventosTutorialComponent,
		FavoritosTutorialComponent,
		ChatTutorialComponent
	],
	imports: [IonicModule],
	exports: [
		HomeTutorialComponent,
		DetallesTutorialComponent,
		OfertasTutorialComponent,
		EventosTutorialComponent,
		FavoritosTutorialComponent,
		ChatTutorialComponent
		]
})
export class ComponentModule {}