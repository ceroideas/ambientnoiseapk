import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaDetallesPage } from './lista-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDetallesPageRoutingModule {}
