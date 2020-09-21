import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LPerfilPage } from './l-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: LPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LPerfilPageRoutingModule {}
