import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Product} from '../domain/product';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  productSubject = new Subject< Product[] >();
  product: Product[] = [];

  constructor(private http: HttpClient) { }

  emitProductSubject(): void {
    this.productSubject.next(this.product);
  }

  getProduct(id: number): Observable<Product[]> {
    return this.http
      .get<Product[]>('http://localhost:8081/product/' + id)
      .pipe( map(httpResponse => httpResponse));
  }

  getProductList() {
    return this.http
      .get<Product[]>('http://localhost:8081/products')
      .pipe( map( httpResponse => httpResponse));
  }
}
