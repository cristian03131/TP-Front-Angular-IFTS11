import { Product } from './product.interface';

// Interfaz para el elemento dentro del carrito
export interface CartItem {
  product: Product;
  quantity: number;
}
