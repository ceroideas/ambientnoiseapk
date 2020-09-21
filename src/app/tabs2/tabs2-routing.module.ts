import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: '',
    component: Tabs2Page,
    children: [
      {
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: '../locales/l-eventos/l-eventos.module#LEventosPageModule'
          },{
            path: 'nuevo-evento',
            loadChildren: '../locales/nuevo-evento/nuevo-evento.module#NuevoEventoPageModule'
          }
        ]
      },{
        path: 'listas',
        children: [
          {
            path: '',
            loadChildren: '../locales/listas/listas.module#ListasPageModule'
          },{
            path: 'nueva-lista',
            loadChildren: '../locales/nueva-lista/nueva-lista.module#NuevaListaPageModule'
          },{
            path: 'lista-detalles',
            loadChildren: '../locales/lista-detalles/lista-detalles.module#ListaDetallesPageModule'
          }
        ]
      },{
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../locales/l-perfil/l-perfil.module#LPerfilPageModule'
          }
        ]
      },{
        path: 'ofertas',
        children: [
          {
            path: '',
            loadChildren: '../locales/l-ofertas/l-ofertas.module#LOfertasPageModule'
          },{
            path: 'nueva-oferta',
            loadChildren: '../locales/nueva-oferta/nueva-oferta.module#NuevaOfertaPageModule'
          }
        ]
      },{
        path: 'locales',
        children: [
          {
            path: '',
            loadChildren: '../locales/locales/locales.module#LocalesPageModule'
          },{
            path: 'nuevo',
            loadChildren: '../locales/nuevo/nuevo.module#NuevoPageModule'
          },{
            path: 'ropero',
            loadChildren: '../locales/l-ropero/l-ropero.module#LRoperoPageModule'
          }
        ]
      },{
        path: 'pedidos',
        children: [
          {
            path: '',
            loadChildren: '../locales/pedidos/pedidos.module#PedidosPageModule'
          }
        ]
      },{
        path: '',
        redirectTo: '/local/locales',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tabs2PageRoutingModule {}
