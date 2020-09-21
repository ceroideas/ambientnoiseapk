import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TOfertasPage } from './t-ofertas.page';

const routes: Routes = [
  {
    path: '',
    component: TOfertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TOfertasPageRoutingModule {}
