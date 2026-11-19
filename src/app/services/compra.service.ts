import { Injectable, inject, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.interface';
import { Cliente } from '../interfaces/cliente.inteface';
import { Compra } from '../interfaces/compra.interface';
import { LocalStorageService } from './localstorage.service';

const CLAVE_ULTIMA_COMPRA = 'ultimaCompra';
const CLAVE_CONTADOR = 'contadorPedidos';

@Injectable({ providedIn: 'root' })
export class CompraService {
  private readonly localStorageService = inject(LocalStorageService);

  private readonly ultimaCompraSignal = signal<Compra | null>(this.leerUltimaCompra());

  /** Última compra confirmada (null si todavía no hubo ninguna). */
  readonly ultimaCompra = this.ultimaCompraSignal.asReadonly();

  /** Registra una compra simulada, le asigna número de pedido y la guarda. */
  registrarCompra(cliente: Cliente, items: CartItem[], total: number): Compra {
    const compra: Compra = { numero: this.siguienteNumero(), cliente, items, total };
    this.ultimaCompraSignal.set(compra);
    this.localStorageService.setItem(CLAVE_ULTIMA_COMPRA, JSON.stringify(compra));
    return compra;
  }

  private siguienteNumero(): number {
    const actual = Number(this.localStorageService.getItem(CLAVE_CONTADOR));
    const siguiente = (Number.isInteger(actual) && actual > 0 ? actual : 0) + 1;
    this.localStorageService.setItem(CLAVE_CONTADOR, String(siguiente));
    return siguiente;
  }

  private leerUltimaCompra(): Compra | null {
    const datos = this.localStorageService.getItem(CLAVE_ULTIMA_COMPRA);
    if (!datos) return null;

    try {
      const compra = JSON.parse(datos) as Partial<Compra> | null;
      const valida =
        typeof compra?.numero === 'number' &&
        typeof compra.total === 'number' &&
        typeof compra.cliente === 'object' && compra.cliente !== null &&
        Array.isArray(compra.items);
      return valida ? (compra as Compra) : null;
    } catch {
      return null;
    }
  }
}
