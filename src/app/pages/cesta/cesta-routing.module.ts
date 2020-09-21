import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CestaPage } from './cesta.page';

const routes: Routes = [
  {
    path: '',
    component: CestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CestaPageRoutingModule {}
