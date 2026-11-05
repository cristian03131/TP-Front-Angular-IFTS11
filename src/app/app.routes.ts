import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetail } from './pages/product-detail/product-detail';

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
    path: 'products/:id',
    component: ProductDetail
  },
  {
    path: '**',
    redirectTo: ''
  }
];