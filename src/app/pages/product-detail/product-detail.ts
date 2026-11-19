import { Component, OnInit, inject, ChangeDetectorRef, DestroyRef, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap, throwError } from 'rxjs';

import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private cartService = inject(CartService);
  protected readonly cartMessage = signal('');

  private cartMessageTimeout?: ReturnType<typeof setTimeout>;
  product: Product | null = null;
  loading = true;
  errorMessage = '';

  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart(this.product);

    this.cartMessage.set(
      `¡${this.product.title} se agregó al carrito correctamente!`
    );

    clearTimeout(this.cartMessageTimeout);

    this.cartMessageTimeout = setTimeout(() => {
      this.cartMessage.set('');
    }, 3000);
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));

          if (!Number.isInteger(id) || id <= 0) {
            return throwError(() => new Error('El ID del producto no es válido.'));
          }

          this.loading = true;
          this.errorMessage = '';

          return this.productService.getProductById(id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;

          this.cdr.markForCheck();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.loading = false;

          this.cdr.markForCheck();
        }
      });
  }
}
