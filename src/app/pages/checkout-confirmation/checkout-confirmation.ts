import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-checkout-confirmation',
  imports: [CurrencyPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-confirmation.html',
  styleUrl: './checkout-confirmation.css',
})
export class CheckoutConfirmation {
  private readonly router = inject(Router);

  protected readonly compra = inject(CompraService).ultimaCompra;

  /** Número de pedido con ceros a la izquierda (0001). */
  protected readonly numeroPedido = computed(() =>
    String(this.compra()?.numero ?? 0).padStart(4, '0'),
  );

  constructor() {
    // Sin compra confirmada no hay nada que mostrar: volvemos al catálogo
    if (!this.compra()) {
      this.router.navigate(['/']);
    }
  }
}
