import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Checkout } from './pages/checkout/checkout';
import { CheckoutConfirmation } from './pages/checkout-confirmation/checkout-confirmation';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'ShopFlow | Catálogo de productos',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'ShopFlow | Carrito de Compras'
  },
  {
    path: 'products/:id',
    component: ProductDetail
  },
  {
    path: 'checkout',
    component:Checkout
  },
  {
    path: 'checkout/confirmation',
    component: CheckoutConfirmation,
    title: 'ShopFlow | Compra confirmada',
  },
  {
    path: '**',
    component: NotFound,
    title: 'ShopFlow | Página no encontrada',
  }
];
