import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPage } from './gallery.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryPage
  },
  {
    path: 'ver-imagen',
    loadChildren: () => import('./ver-imagen/ver-imagen.module').then( m => m.VerImagenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryPageRoutingModule {}
