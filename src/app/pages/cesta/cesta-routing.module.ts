import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CestaPage } from './cesta.page';

const routes: Routes = [
  {
    path: '',
    component: CestaPage
  },
  {
    path: 'pagar/:id',
    loadChildren: () => import('./pagar/pagar.module').then( m => m.PagarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CestaPageRoutingModule {}
