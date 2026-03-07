import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {SupplierModel} from '../models/supplier.model';
import {CategoryModel} from '../models/category.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class Supplier {
  suppliers!: SupplierModel[];

  constructor(private http: HttpClient) {
  }

  listSuppliers(): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(environment.apiURL+"/suppliers");
  }

  viewSupplier(id: number): Observable<SupplierModel> {
    const url = `${environment.apiURL}/suppliers/${id}`;
    return this.http.get<SupplierModel>(url);
  }

  createSupplier(prod: Partial<SupplierModel> | any): Observable<SupplierModel> {
    return this.http.post<SupplierModel>(environment.apiURL+"/suppliers", prod, httpOptions);
  }

  updateSupplier(id: number, supplierRequest: any): Observable<SupplierModel> {
    return this.http.put<SupplierModel>(`${environment.apiURL}/suppliers/${id}`, supplierRequest, httpOptions);
  }

  deleteSupplier(id: number) {
    const url = `${environment.apiURL}/suppliers/${id}`;
    return this.http.delete(url, httpOptions);
  }

  listCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(environment.apiURL + "/categories");
  }

  createCategory(cat: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(environment.apiURL + "/categories", cat, httpOptions);
  }

  updateCategory(cat: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${environment.apiURL}/categories/${cat.id}`, cat, httpOptions);
  }

  searchByCategory(categoryId: number): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${environment.apiURL}/suppliers/category/${categoryId}`);
  }

  searchByName(name: string): Observable<SupplierModel[]> {
    return this.http.get<SupplierModel[]>(`${environment.apiURL}/suppliers/name/${name}`);
  }
}
