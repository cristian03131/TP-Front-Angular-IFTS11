import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Enlace que se muestra en el pie de página. */
interface FooterLink {
  /** Texto visible del enlace. */
  label: string;
  /** Ruta de destino usada por `routerLink`. */
  path: string;
}

/**
 * Pie de página de la aplicación.
 *
 * Barra compacta con la marca, enlaces de navegación y el aviso de derechos
 * con el año actual. Se renderiza en el shell (`app.html`), por lo que aparece
 * en todas las páginas, siempre debajo del contenido.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  /** Nombre de la marca que se muestra en el pie. */
  protected readonly brand = 'TP Front Angular';

  /** Año actual, usado en el aviso de derechos. */
  protected readonly year = new Date().getFullYear();

  /** Enlaces de navegación del pie. */
  protected readonly navLinks: readonly FooterLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Productos', path: '/products' },
    { label: 'Carrito', path: '/cart' },
    { label: 'Checkout', path: '/checkout' },
  ];
}
