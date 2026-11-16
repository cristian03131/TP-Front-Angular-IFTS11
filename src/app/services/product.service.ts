import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../interfaces/product.interface';
import { ProductsResponse } from '../interfaces/products-response.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly productsUrl = 'https://dummyjson.com/products';

  getProducts(page = 1, limit = 20): Observable<ProductsResponse> {
    const currentPage = this.toPositiveInteger(page, 1);
    const productsPerPage = this.toPositiveInteger(limit, 20);
    const skip = (currentPage - 1) * productsPerPage;
    const params = new HttpParams().set('limit', productsPerPage).set('skip', skip);

    return this.http
      .get<ProductsResponse>(this.productsUrl, { params })
      .pipe(catchError(this.handleError));
  }

  /**
   * Devuelve los productos cuyo título contiene el texto buscado (sin distinguir
   * mayúsculas).
  */
  searchProducts(query: string, page = 1, limit = 20): Observable<ProductsResponse> {
    const currentPage = this.toPositiveInteger(page, 1);
    const productsPerPage = this.toPositiveInteger(limit, 20);
    const skip = (currentPage - 1) * productsPerPage;
    const term = query.trim().toLowerCase();
    const params = new HttpParams().set('q', term).set('limit', 0);

    return this.http.get<ProductsResponse>(`${this.productsUrl}/search`, { params }).pipe(
      catchError(this.handleError),
      map(({ products }) => {
        const matches = products.filter((product) =>
          product.title.toLowerCase().includes(term),
        );

        return {
          products: matches.slice(skip, skip + productsPerPage),
          total: matches.length,
          skip,
          limit: productsPerPage,
        };
      }),
    );
  }

  getProductById(id: number): Observable<Product> {
    if (!Number.isInteger(id) || id <= 0) {
      return throwError(() => new Error('El ID del producto debe ser un entero positivo.'));
    }

    return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private toPositiveInteger(value: number, fallback: number): number {
    return Number.isInteger(value) && value > 0 ? value : fallback;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      error.status === 0
        ? 'No se pudo conectar con el servicio de productos.'
        : `No se pudo obtener la información de productos. Código HTTP: ${error.status}.`;

    return throwError(() => new Error(message));
  }
}
