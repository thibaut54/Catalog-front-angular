import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Product} from '../domain/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
      .get<Product[]>('http://localhost:8080/product/' + id)
      .pipe( map(httpResponse => httpResponse));
  }

  getProductList(): Observable<Product[]> {
    return this.http
      .get<Product[]>('http://localhost:8080/products')
      .pipe( map( httpResponse => httpResponse));
  }

  deleteProductList(idList: number[]) {
    this.http
      .delete('http://localhost:8080/products/' + idList).subscribe();
  }

  deleteProductListWithBody(idListBody: number[]) {
    const idList = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: idListBody
    };
    this.http
      .delete('http://localhost:8080/products', idList).subscribe();
  }
}
