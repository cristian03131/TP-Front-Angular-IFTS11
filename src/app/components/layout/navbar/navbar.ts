import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Representa un enlace de navegación de la barra. */
interface NavLink {
  /** Texto visible del enlace. */
  label: string;
  /** Ruta de destino usada por `routerLink`. */
  path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  /** Indica si el menú móvil está desplegado. */
  protected readonly isOpen = signal(false);

  /** Enlaces que se renderizan en la barra de navegación. */
  protected readonly links: readonly NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Productos', path: '/products' },
    { label: 'Carrito', path: '/cart' },
    { label: 'Checkout', path: '/checkout' },
  ];

  /** Alterna la apertura del menú móvil (abre si está cerrado y viceversa). */
  protected toggle(): void {
    this.isOpen.update((open) => !open);
  }

  /** Cierra el menú móvil. Se invoca al seleccionar un enlace. */
  protected close(): void {
    this.isOpen.set(false);
  }
}
