import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LOfertasPage } from './l-ofertas.page';

const routes: Routes = [
  {
    path: '',
    component: LOfertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LOfertasPageRoutingModule {}
