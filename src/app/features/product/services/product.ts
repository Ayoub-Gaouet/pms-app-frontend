import {Injectable} from '@angular/core';
import {ProductModel} from '../models/product.model';
import {CategoryModel} from '../models/category.model';
import {SupplierModel} from '../../supplier/models/supplier.model';
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
    return this.http.get<ProductModel[]>(environment.apiURL + "/products");
  }

  viewProduct(id: number): Observable<ProductModel> {
    const url = `${environment.apiURL}/products/${id}`;
    return this.http.get<ProductModel>(url);
  }

  createProduct(prod: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(environment.apiURL + "/products", prod, httpOptions);
  }

  updateProduct(prod: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${environment.apiURL}/products/${prod.id}`, prod, httpOptions);
  }

  deleteProduct(id: number) {
    const url = `${environment.apiURL}/products/${id}`;
    return this.http.delete(url, httpOptions);
  }

  listCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(environment.apiURL + "/cat");
  }

  createCategory(cat: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(environment.apiURL + "/cat", cat, httpOptions);
  }

  updateCategory(cat: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${environment.apiURL}/cat/${cat.id}`, cat, httpOptions);
  }

  listSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(environment.apiURL + "/suppliers");
  }

  searchByCategory(idCat: number): Observable<ProductModel[]> {
    const url = `${environment.apiURL}/products/category/${idCat}`;
    return this.http.get<ProductModel[]>(url);
  }

  searchByName(name: string): Observable<ProductModel[]> {
    const url = `${environment.apiURL}/products/prodsByName/${encodeURIComponent(name)}`;
    return this.http.get<ProductModel[]>(url);
  }
}
