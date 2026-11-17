import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly product = input.required<Product>();

  // Ahora emitimos el producto completo
  readonly addToCart = output<Product>();
  readonly viewDetail = output<Product>();

  protected onAddToCart(): void {
    this.addToCart.emit(this.product());
  }

  protected onViewDetail(): void {
    this.viewDetail.emit(this.product());
  }
}
