import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CategoryModel} from '../models/category.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class Product {
  products!: ProductModel[];

  constructor(private http: HttpClient) {
  }

  listProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(environment.apiURL+"/products");
  }

  viewProduct(id: number): Observable<ProductModel> {
    const url = `${environment.apiURL}/products/${id}`;
    return this.http.get<ProductModel>(url);
  }

  createProduct(prod: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(environment.apiURL+"/products", prod, httpOptions);
  }

  updateProduct(prod: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(environment.apiURL+"/products", prod, httpOptions);
  }

  deleteProduct(id: number) {
    const url = `${environment.apiURL}/products/${id}`;
    return this.http.delete(url, httpOptions);
  }

  listCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(environment.apiURL + "/cat");
  }

}
