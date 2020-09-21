import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LHomePage } from './l-home.page';

const routes: Routes = [
  {
    path: '',
    component: LHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LHomePageRoutingModule {}
