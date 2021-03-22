import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedsPage } from './blockeds.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedsPageRoutingModule {}
