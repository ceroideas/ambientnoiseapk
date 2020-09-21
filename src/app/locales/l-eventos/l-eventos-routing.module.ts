import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LEventosPage } from './l-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: LEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LEventosPageRoutingModule {}
