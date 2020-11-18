import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerImagenPage } from './ver-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: VerImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerImagenPageRoutingModule {}
