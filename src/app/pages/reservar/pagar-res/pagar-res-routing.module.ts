import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarResPage } from './pagar-res.page';

const routes: Routes = [
  {
    path: '',
    component: PagarResPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarResPageRoutingModule {}
