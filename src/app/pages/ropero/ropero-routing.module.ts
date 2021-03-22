import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoperoPage } from './ropero.page';

const routes: Routes = [
  {
    path: '',
    component: RoperoPage
  },
  {
    path: 'pagar-r/:id/:quantity',
    loadChildren: () => import('./pagar-r/pagar-r.module').then( m => m.PagarRPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoperoPageRoutingModule {}
