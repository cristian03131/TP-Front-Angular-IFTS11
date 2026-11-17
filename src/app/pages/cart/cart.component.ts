import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartService = inject(CartService);

  public removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }
}