import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, throwError } from 'rxjs';

import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';

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

  product: Product | null = null;
  loading = true;
  errorMessage = '';

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
        })
      )
      .subscribe({
        next: (product) => {
          console.log('Producto recibido:', product);

          this.product = product;
          this.loading = false;

          this.cdr.markForCheck();
        },
        error: (error) => {
          console.error('Error al obtener producto:', error);

          this.errorMessage = error.message;
          this.loading = false;

          this.cdr.markForCheck();
        }
      });
  }
}
