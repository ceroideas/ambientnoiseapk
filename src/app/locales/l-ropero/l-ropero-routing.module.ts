import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LRoperoPage } from './l-ropero.page';

const routes: Routes = [
  {
    path: '',
    component: LRoperoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LRoperoPageRoutingModule {}
