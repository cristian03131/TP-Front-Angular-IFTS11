import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'TiendaTP | Catálogo de productos',
  },

  { 
    path: 'cart', 
    component: CartComponent, 
    title: 'TiendaTP | Carrito de Compras'
  },

  { 
    path: '**', 
    redirectTo: '' 
  }

];
