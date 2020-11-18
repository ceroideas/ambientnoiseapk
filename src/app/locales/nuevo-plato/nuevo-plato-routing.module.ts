import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoPlatoPage } from './nuevo-plato.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoPlatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoPlatoPageRoutingModule {}
