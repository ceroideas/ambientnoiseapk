import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LPerfilPage } from './l-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: LPerfilPage
  },
  {
    path: 'membership',
    loadChildren: () => import('./membership/membership.module').then( m => m.MembershipPageModule)
  },
  {
    path: 'reservas/:id',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LPerfilPageRoutingModule {}
