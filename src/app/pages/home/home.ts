
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pagination } from '../../components/products/pagination/pagination';
import { ProductCard } from '../../components/products/product-card/product-card';
import { Search } from '../../components/search/search';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [ProductCard, Pagination, Search],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  private requestSubscription?: Subscription;
  private shouldScrollToProducts = false;
  private cartMessageTimeout?: ReturnType<typeof setTimeout>;

  protected readonly cartMessage = signal('');
  protected readonly products = signal<Product[]>([]);
  protected readonly currentPage = signal(1);
  protected readonly totalProducts = signal(0);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly searchTerm = signal('');
  protected readonly pageSize = 20;

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.totalProducts() / this.pageSize)),
  );

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.requestSubscription?.unsubscribe();

    if (this.cartMessageTimeout) {
      clearTimeout(this.cartMessageTimeout);
    }
  }

  protected goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
      this.shouldScrollToProducts = true;
      this.loadProducts();
    }
  }

  protected goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
      this.shouldScrollToProducts = true;
      this.loadProducts();
    }
  }

  protected onSearch(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
    this.loadProducts();
  }

  protected retry(): void {
    this.loadProducts();
  }

  /// Agregar producto al carrito y mostrar confirmación
  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);

    this.cartMessage.set(
      `¡${product.title} se agregó al carrito correctamente!`
    );

    if (this.cartMessageTimeout) {
      clearTimeout(this.cartMessageTimeout);
    }

    this.cartMessageTimeout = setTimeout(() => {
      this.cartMessage.set('');
    }, 3000);
  }

  // Navegar al detalle del producto
  protected viewProductDetail(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  private loadProducts(): void {
    this.requestSubscription?.unsubscribe();
    this.isLoading.set(true);
    this.hasError.set(false);
    const term = this.searchTerm();
    const request$ = term
      ? this.productService.searchProducts(term, this.currentPage(), this.pageSize)
      : this.productService.getProducts(this.currentPage(), this.pageSize);

    this.requestSubscription = request$.subscribe({
        next: (response) => {
          this.products.set(response.products);
          this.totalProducts.set(response.total);
          this.isLoading.set(false);
          this.scrollToProductsWhenReady();
        },
        error: () => {
          this.products.set([]);
          this.hasError.set(true);
          this.isLoading.set(false);
          this.shouldScrollToProducts = false;
        },
      });
  }

  private scrollToProductsWhenReady(): void {
    if (!this.shouldScrollToProducts) return;

    this.shouldScrollToProducts = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
}
