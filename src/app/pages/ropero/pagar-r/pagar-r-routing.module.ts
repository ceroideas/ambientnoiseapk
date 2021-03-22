import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagarRPage } from './pagar-r.page';

const routes: Routes = [
  {
    path: '',
    component: PagarRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagarRPageRoutingModule {}
