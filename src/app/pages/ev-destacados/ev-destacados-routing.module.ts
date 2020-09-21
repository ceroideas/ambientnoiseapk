import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvDestacadosPage } from './ev-destacados.page';

const routes: Routes = [
  {
    path: '',
    component: EvDestacadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvDestacadosPageRoutingModule {}
