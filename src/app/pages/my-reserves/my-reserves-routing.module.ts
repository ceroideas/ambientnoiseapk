import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyReservesPage } from './my-reserves.page';

const routes: Routes = [
  {
    path: '',
    component: MyReservesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReservesPageRoutingModule {}
