import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TacticPage } from './tactic.page';

const routes: Routes = [
  {
    path: '',
    component: TacticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TacticPageRoutingModule {}
