import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = 'http://localhost:8000'; // Base URL for your API

  // Shared state example
  isOpenItem: any = {};
  isOpenItemSubject = new BehaviorSubject<any>(this.isOpenItem);
  isOpenItemSubject$ = this.isOpenItemSubject.asObservable();
  http = inject(HttpClient);



  // Product Controller Methods
  public getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product`);
  }

  public getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${id}`);
  }

  public searchProductByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/findProducts/${name}`);
  }

  public sortProductsByNameAsc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/sortedNameByAcs`);
  }

  public sortProductsByNameDesc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/sortedNameByDesc`);
  }

  public sortProductsByPriceAsc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/sortedPriceByAcs`);
  }

  public sortProductsByPriceDesc(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/product/sortedPriceByDesc`);
  }

  public getProductMarkSum(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/product/sumMark`);
  }

  public convertToRating(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/product/conversionToRating`);
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/product`, product);
  }

  public updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/product/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product/${id}`);
  }

  // Bag Controller Methods
  public getAllBags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bag`);
  }

  public getBagById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bag/${id}`);
  }

  public checkout(userId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/bag/checkout/${userId}`);
  }

  public addProductToBag(productId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/bag/addProduct/${productId}/${userId}`, {});
  }

  public deleteProductFromBag(productId: number, bagId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bag/deleteProductInBag/${productId}/${bagId}`);
  }

  // Purchase Controller Methods
  public getPurchasesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/purchase/${userId}`);
  }

  // User Controller Methods
  public getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user`);
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${id}`);
  }

  public searchUsersByFullName(fullName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/searchUsers/${fullName}`);
  }

  public getUserBalance(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/user/getUserBalance/${userId}`);
  }

  public addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user`, user);
  }

  public setUserBalance(userId: number, amount: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/user/setBalance/${userId}/${amount}`, {});
  }

  public updateUser(id: number, userDto: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/${id}`, userDto);
  }

  public updatePassword(user: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/user/password`, user);
  }

  public deleteUserById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${id}`);
  }

  // State Management Example
  public addItem(item: any): void {
    this.isOpenItem = item;
    this.isOpenItemSubject.next(this.isOpenItem);
  }
}
