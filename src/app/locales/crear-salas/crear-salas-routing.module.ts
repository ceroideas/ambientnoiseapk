import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearSalasPage } from './crear-salas.page';

const routes: Routes = [
  {
    path: '',
    component: CrearSalasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearSalasPageRoutingModule {}
