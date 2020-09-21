import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoperoPage } from './ropero.page';

const routes: Routes = [
  {
    path: '',
    component: RoperoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoperoPageRoutingModule {}
