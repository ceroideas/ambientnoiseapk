import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./pages/disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'ropero',
    loadChildren: () => import('./pages/ropero/ropero.module').then( m => m.RoperoPageModule)
  },
  {
    path: 't-ofertas',
    loadChildren: () => import('./pages/t-ofertas/t-ofertas.module').then( m => m.TOfertasPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'ev-destacados',
    loadChildren: () => import('./pages/ev-destacados/ev-destacados.module').then( m => m.EvDestacadosPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'sala',
    loadChildren: () => import('./pages/sala/sala.module').then( m => m.SalaPageModule)
  },
  {
    path: 'sala-detalle',
    loadChildren: () => import('./pages/sala-detalle/sala-detalle.module').then( m => m.SalaDetallePageModule)
  },
  {
    path: 'local',
    loadChildren: () => import('./tabs2/tabs2.module').then( m => m.Tabs2PageModule)
  },
  {
    path: 'ocupacion',
    loadChildren: () => import('./locales/ocupacion/ocupacion.module').then( m => m.OcupacionPageModule)
  },
  {
    path: 'l-eventos',
    loadChildren: () => import('./locales/l-eventos/l-eventos.module').then( m => m.LEventosPageModule)
  },
  {
    path: 'nueva-oferta',
    loadChildren: () => import('./locales/nueva-oferta/nueva-oferta.module').then( m => m.NuevaOfertaPageModule)
  },
  {
    path: 'nuevo-evento',
    loadChildren: () => import('./locales/nuevo-evento/nuevo-evento.module').then( m => m.NuevoEventoPageModule)
  },
  {
    path: 'listas',
    loadChildren: () => import('./locales/listas/listas.module').then( m => m.ListasPageModule)
  },
  {
    path: 'lista-detalles',
    loadChildren: () => import('./locales/lista-detalles/lista-detalles.module').then( m => m.ListaDetallesPageModule)
  },
  {
    path: 'nueva-lista',
    loadChildren: () => import('./locales/nueva-lista/nueva-lista.module').then( m => m.NuevaListaPageModule)
  },
  {
    path: 'l-ropero',
    loadChildren: () => import('./locales/l-ropero/l-ropero.module').then( m => m.LRoperoPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./locales/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'crear-salas',
    loadChildren: () => import('./locales/crear-salas/crear-salas.module').then( m => m.CrearSalasPageModule)
  },
  {
    path: 'nueva-sala',
    loadChildren: () => import('./locales/nueva-sala/nueva-sala.module').then( m => m.NuevaSalaPageModule)
  },
  {
    path: 'nueva-reserva',
    loadChildren: () => import('./locales/nueva-reserva/nueva-reserva.module').then( m => m.NuevaReservaPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./locales/reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'reservar',
    loadChildren: () => import('./pages/reservar/reservar.module').then( m => m.ReservarPageModule)
  },
  {
    path: 'mis-reservas',
    loadChildren: () => import('./pages/mis-reservas/mis-reservas.module').then( m => m.MisReservasPageModule)
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./pages/chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },
  // {
  //   path: 'locales',
  //   loadChildren: () => import('./locales/locales.module').then( m => m.LocalesPageModule)
  // },
  // {
  //   path: 'home-tutorial',
  //   loadChildren: () => import('./tutoriales/home-tutorial/home-tutorial.module').then( m => m.HomeTutorialPageModule)
  // },
  // {
  //   path: 'nuevo',
  //   loadChildren: () => import('./locales/nuevo/nuevo.module').then( m => m.NuevoPageModule)
  // },
  // {
  //   path: 'l-home',
  //   loadChildren: () => import('./locales/l-home/l-home.module').then( m => m.LHomePageModule)
  // },
  // {
  //   path: 'l-ofertas',
  //   loadChildren: () => import('./locales/l-ofertas/l-ofertas.module').then( m => m.LOfertasPageModule)
  // },
  // {
  //   path: 'l-perfil',
  //   loadChildren: () => import('./locales/l-perfil/l-perfil.module').then( m => m.LPerfilPageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'perfil',
  //   loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  // },
  // {
  //   path: 'ofertas',
  //   loadChildren: () => import('./pages/ofertas/ofertas.module').then( m => m.OfertasPageModule)
  // },
  // {
  //   path: 'locales',
  //   loadChildren: () => import('./locales/locales/locales.module').then( m => m.LocalesPageModule)
  // },
  // {
  //   path: 'pedidos',
  //   loadChildren: () => import('./locales/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  // },
  // {
  //   path: 'faqs',
  //   loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  // },
  // {
  //   path: 'politica',
  //   loadChildren: () => import('./politica/politica.module').then( m => m.PoliticaPageModule)
  // },
  // {
  //   path: 'map',
  //   loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  // },
  // {
  //   path: 'filtros',
  //   loadChildren: () => import('./pages/filtros/filtros.module').then( m => m.FiltrosPageModule)
  // },
  // {
  //   path: 'detalles',
  //   loadChildren: () => import('./pages/detalles/detalles.module').then( m => m.DetallesPageModule)
  // },
  // {
  //   path: 'ajustes',
  //   loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  // },
  // {
  //   path: 'tactic',
  //   loadChildren: () => import('./pages/tactic/tactic.module').then( m => m.TacticPageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'perfil',
  //   loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  // },
  // {
  //   path: 'ofertas',
  //   loadChildren: () => import('./pages/ofertas/ofertas.module').then( m => m.OfertasPageModule)
  // },
  // {
  //   path: 'favoritos',
  //   loadChildren: () => import('./pages/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  // },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  // },
  // {
  //   path: 'cesta',
  //   loadChildren: () => import('./pages/cesta/cesta.module').then( m => m.CestaPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
