import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaSalaPage } from './nueva-sala.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaSalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaSalaPageRoutingModule {}
