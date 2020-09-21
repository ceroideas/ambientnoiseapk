import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          },{
            path: 'map',
            loadChildren: '../pages/map/map.module#MapPageModule'
          },{
            path: 'filtros',
            loadChildren: '../pages/filtros/filtros.module#FiltrosPageModule'
          },{
            path: 'detalles',
            loadChildren: '../pages/detalles/detalles.module#DetallesPageModule'
          },{
            path: 'tactic',
            loadChildren: '../pages/tactic/tactic.module#TacticPageModule'
          },{
            path: 't-ofertas',
            loadChildren: '../pages/t-ofertas/t-ofertas.module#TOfertasPageModule'
          },{
            path: 'sala',
            loadChildren: '../pages/sala/sala.module#SalaPageModule'
          },{
            path: 'sala-detalle',
            loadChildren: '../pages/sala-detalle/sala-detalle.module#SalaDetallePageModule'
          },{
            path: 'eventos',
            loadChildren: '../pages/eventos/eventos.module#EventosPageModule'
          },{
            path: 'ropero',
            loadChildren: '../pages/ropero/ropero.module#RoperoPageModule'
          },{
            path: 'lista',
            loadChildren: '../pages/lista/lista.module#ListaPageModule'
          },{
            path: 'carrito',
            loadChildren: '../pages/cesta/cesta.module#CestaPageModule'
          }
        ]
      },{
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: '../pages/perfil/perfil.module#PerfilPageModule'
          },{
            path: 'ajustes',
            loadChildren: '../pages/ajustes/ajustes.module#AjustesPageModule'
          },{
            path: 'carrito',
            loadChildren: '../pages/cesta/cesta.module#CestaPageModule'
          }
        ]
      },{
        path: 'ofertas',
        children: [
          {
            path: '',
            loadChildren: '../pages/ofertas/ofertas.module#OfertasPageModule'
          }
        ]
      },{
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: '../pages/ev-destacados/ev-destacados.module#EvDestacadosPageModule'
          },{
            path: 'lista',
            loadChildren: '../pages/lista/lista.module#ListaPageModule'
          }
        ]
      },{
        path: 'favoritos',
        children: [
          {
            path: '',
            loadChildren: '../pages/favoritos/favoritos.module#FavoritosPageModule'
          }
        ]
      },{
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: '../pages/chat/chat.module#ChatPageModule'
          }
        ]
      },{
        path: 'cesta',
        children: [
          {
            path: '',
            loadChildren: '../pages/cesta/cesta.module#CestaPageModule'
          }
        ]
      },{
        path: 'faqs',
        children: [
          {
            path: '',
            loadChildren: '../faqs/faqs.module#FaqsPageModule'
          }
        ]
      },{
        path: 'politica',
        children: [
          {
            path: '',
            loadChildren: '../politica/politica.module#PoliticaPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
