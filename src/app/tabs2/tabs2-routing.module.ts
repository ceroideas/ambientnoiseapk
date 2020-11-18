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
            loadChildren: ()=> import('../locales/l-eventos/l-eventos.module').then(m=>m.LEventosPageModule)
          },{
            path: 'nuevo-evento',
            loadChildren: ()=> import('../locales/nuevo-evento/nuevo-evento.module').then(m=>m.NuevoEventoPageModule)
          }
        ]
      },{
        path: 'listas',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../locales/listas/listas.module').then(m=>m.ListasPageModule)
          },{
            path: 'nueva-lista',
            loadChildren: ()=> import('../locales/nueva-lista/nueva-lista.module').then(m=>m.NuevaListaPageModule)
          },{
            path: 'lista-detalles',
            loadChildren: ()=> import('../locales/lista-detalles/lista-detalles.module').then(m=>m.ListaDetallesPageModule)
          }
        ]
      },{
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../locales/l-perfil/l-perfil.module').then(m=>m.LPerfilPageModule)
          },{
            path: 'ajustes',
            loadChildren: ()=> import('../pages/ajustes/ajustes.module').then(m=>m.AjustesPageModule)
          },{
            path: 'carta/:id',
            loadChildren: ()=> import('../locales/menu/menu.module').then(m=>m.MenuPageModule)
          },{
            path: 'galeria',
            loadChildren: ()=> import('../pages/gallery/gallery.module').then(m=>m.GalleryPageModule)
          },{
            path: 'nuevo-plato/:id',
            loadChildren: ()=> import('../locales/nuevo-plato/nuevo-plato.module').then(m=>m.NuevoPlatoPageModule)
          }
        ]
      },{
        path: 'ofertas',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../locales/l-ofertas/l-ofertas.module').then(m=>m.LOfertasPageModule)
          },{
            path: 'nueva-oferta',
            loadChildren: ()=> import('../locales/nueva-oferta/nueva-oferta.module').then(m=>m.NuevaOfertaPageModule)
          }
        ]
      },{
        path: 'locales',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../locales/locales/locales.module').then(m=>m.LocalesPageModule)
          },{
            path: 'nuevo',
            loadChildren: ()=> import('../locales/nuevo/nuevo.module').then(m=>m.NuevoPageModule)
          },{
            path: 'ropero',
            loadChildren: ()=> import('../locales/l-ropero/l-ropero.module').then(m=>m.LRoperoPageModule)
          },{
            path: 'salas/:id',
            loadChildren: ()=> import('../locales/crear-salas/crear-salas.module').then(m=>m.CrearSalasPageModule)
          },{
            path: 'nueva-sala/:id',
            children: [
              {
                path: '',
                loadChildren: ()=> import('../locales/nueva-sala/nueva-sala.module').then(m=>m.NuevaSalaPageModule)
              }
            ]
          },{
            path: 'reservas/:id',
            children: [
              {
                path: '',
                loadChildren: ()=> import('../locales/reservas/reservas.module').then(m=>m.ReservasPageModule)
              }
            ]
          },{
            path: 'nueva-reserva/:id',
            children: [
              {
                path: '',
                loadChildren: ()=> import('../locales/nueva-reserva/nueva-reserva.module').then(m=>m.NuevaReservaPageModule)
              }
            ]
          },
        ]
      },{
        path: 'pedidos',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../locales/pedidos/pedidos.module').then(m=>m.PedidosPageModule)
          }
        ]
      },{
        path: 'faqs',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../faqs/faqs.module').then(m=>m.FaqsPageModule)
          }
        ]
      },{
        path: 'politica',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../politica/politica.module').then(m=>m.PoliticaPageModule)
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
