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
            loadChildren: ()=> import('../pages/home/home.module').then(m=>m.HomePageModule)
          },{
            path: 'map',
            loadChildren: ()=> import('../pages/map/map.module').then(m=>m.MapPageModule)
          },{
            path: 'filtros',
            loadChildren: ()=> import('../pages/filtros/filtros.module').then(m=>m.FiltrosPageModule)
          },
          {path: 'detalles',loadChildren: ()=> import('../pages/detalles/detalles.module').then(m=>m.DetallesPageModule)},
          {path: 'detalles/:id',loadChildren: ()=> import('../pages/detalles/detalles.module').then(m=>m.DetallesPageModule)},
          {path: 'reservar/:id',loadChildren: ()=> import('../pages/reservar/reservar.module').then(m=>m.ReservarPageModule)},
          {path: 'mis-reservas/:id',loadChildren: ()=> import('../pages/mis-reservas/mis-reservas.module').then(m=>m.MisReservasPageModule)},
          {
            path: 'tactic',
            loadChildren: ()=> import('../pages/tactic/tactic.module').then(m=>m.TacticPageModule)
          },{
            path: 't-ofertas',
            loadChildren: ()=> import('../pages/t-ofertas/t-ofertas.module').then(m=>m.TOfertasPageModule)
          },{
            path: 'sala',
            loadChildren: ()=> import('../pages/sala/sala.module').then(m=>m.SalaPageModule)
          },{
            path: 'sala-detalle',
            loadChildren: ()=> import('../pages/sala-detalle/sala-detalle.module').then(m=>m.SalaDetallePageModule)
          },{
            path: 'eventos',
            loadChildren: ()=> import('../pages/eventos/eventos.module').then(m=>m.EventosPageModule)
          },{
            path: 'ropero',
            loadChildren: ()=> import('../pages/ropero/ropero.module').then(m=>m.RoperoPageModule)
          },{
            path: 'lista/:id',
            loadChildren: ()=> import('../pages/lista/lista.module').then(m=>m.ListaPageModule)
          },{
            path: 'carrito',
            loadChildren: ()=> import('../pages/cesta/cesta.module').then(m=>m.CestaPageModule)
          },{
            path: 'galeria-local',
            loadChildren: ()=> import('../pages/gallery/gallery.module').then(m=>m.GalleryPageModule)
          },{
            path: 'galeria/:id',
            loadChildren: ()=> import('../pages/gallery/gallery.module').then(m=>m.GalleryPageModule)
          },{
            path: 'comment/:id',
            loadChildren: ()=> import('../pages/comment/comment.module').then(m=>m.CommentPageModule)
          }
        ]
      },{
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/perfil/perfil.module').then(m=>m.PerfilPageModule)
          },{
            path: 'ajustes',
            loadChildren: ()=> import('../pages/ajustes/ajustes.module').then(m=>m.AjustesPageModule)
          },{
            path: 'carrito',
            loadChildren: ()=> import('../pages/cesta/cesta.module').then(m=>m.CestaPageModule)
          },{
            path: 'pedidos',
            loadChildren: ()=> import('../pages/pedidos/pedidos.module').then(m=>m.PedidosPageModule)
          },{
            path: 'galeria',
            loadChildren: ()=> import('../pages/gallery/gallery.module').then(m=>m.GalleryPageModule)
          }
        ]
      },{
        path: 'ofertas',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/ofertas/ofertas.module').then(m=>m.OfertasPageModule)
          }
        ]
      },{
        path: 'eventos',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/ev-destacados/ev-destacados.module').then(m=>m.EvDestacadosPageModule)
          },{
            path: 'lista',
            loadChildren: ()=> import('../pages/lista/lista.module').then(m=>m.ListaPageModule)
          }
        ]
      },{
        path: 'favoritos',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/favoritos/favoritos.module').then(m=>m.FavoritosPageModule)
          }
        ]
      },{
        path: 'chat-room',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/chat-room/chat-room.module').then(m=>m.ChatRoomPageModule)
          },{
            path: ':id',
            loadChildren: ()=> import('../pages/chat/chat.module').then(m=>m.ChatPageModule)
          },{
            path: 'galeria/:id',
            loadChildren: ()=> import('../pages/gallery/gallery.module').then(m=>m.GalleryPageModule)
          }
        ]
      },{
        path: 'cesta',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../pages/cesta/cesta.module').then(m=>m.CestaPageModule)
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
        path: 'contacto',
        children: [
          {
            path: '',
            loadChildren: ()=> import('../contact/contact.module').then(m=>m.ContactPageModule)
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
