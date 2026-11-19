import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private localStorageService = inject(LocalStorageService);

  // Estado privado con la lista de ítems del carrito usando Signals
  private cartItemsSignal = signal<CartItem[]>([]);

  // Señal pública de solo lectura para que los componentes puedan consumir el carrito
  public cartItems = this.cartItemsSignal.asReadonly();

  // Señal computada para calcular la cantidad total de productos en el carrito
  public totalItems = computed(() => 
    this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0)
  );

  // Señal computada para calcular el precio total de la compra
  public totalPrice = computed(() => 
    this.cartItemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0)
  );

  constructor() {
    this.initCart();
  }

  public initCart() {
    const localStorageData = this.localStorageService.getItem('cart');
    if (!localStorageData) return;

    try {
      const data: unknown = JSON.parse(localStorageData);
      if (Array.isArray(data)) {
        this.cartItemsSignal.set(data.filter(item => this.isCartItem(item)));
      }
    } catch {
      // Datos corruptos en localStorage: se ignoran y se arranca con carrito vacío
    }
  }

  // Verifica que un valor recuperado de localStorage tenga la forma de un CartItem
  private isCartItem(value: unknown): value is CartItem {
    if (typeof value !== 'object' || value === null) return false;
    const { product, quantity } = value as Partial<CartItem>;
    return (
      typeof product === 'object' && product !== null &&
      typeof product.id === 'number' &&
      typeof product.title === 'string' &&
      typeof product.price === 'number' &&
      typeof quantity === 'number' && Number.isInteger(quantity) && quantity > 0
    );
  }

  // Método para agregar un producto al carrito
  public addToCart(product: Product): void {
    const currentItems = this.cartItemsSignal();
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      // Si el producto ya existe, incrementamos su cantidad
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1
      };
      this.cartItemsSignal.set(updatedItems);
    } else {
      // Si no existe, lo agregamos con cantidad 1
      this.cartItemsSignal.set([...currentItems, { product, quantity: 1 }]);
    }
    this.localStorageService.setItem("cart", JSON.stringify(this.cartItemsSignal()));
  }

  // Método para eliminar un producto por completo del carrito
  public removeFromCart(productId: number): void {
    const filteredItems = this.cartItemsSignal().filter(item => item.product.id !== productId);
    this.cartItemsSignal.set(filteredItems);
    this.localStorageService.setItem("cart", JSON.stringify(this.cartItemsSignal()));
  }

  // Método para vaciar el carrito por completo
  public clearCart(): void {
    this.cartItemsSignal.set([]);
    this.localStorageService.setItem("cart", JSON.stringify(this.cartItemsSignal()));
  }
}