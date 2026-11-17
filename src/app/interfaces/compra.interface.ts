import { Cliente } from './cliente.inteface';
import { CartItem } from './cart-item.interface';

export interface Compra {
    numero: number
    cliente: Cliente
    items: CartItem[]
    total: number
}