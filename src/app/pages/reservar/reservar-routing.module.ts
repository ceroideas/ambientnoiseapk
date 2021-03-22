import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservarPage } from './reservar.page';

const routes: Routes = [
  {
    path: '',
    component: ReservarPage
  },
  {
    path: 'pagar-res/:res_id/:price/:room_id',
    loadChildren: () => import('./pagar-res/pagar-res.module').then( m => m.PagarResPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservarPageRoutingModule {}
