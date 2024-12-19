import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import { AppService } from './app.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatTab,
    MatTabGroup,
    CommonModule
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webJavaEE';
  @ViewChild('tabGroup', { static: true }) tabGroup!: MatTabGroup;
  products: any[] = [];
  bag: any[] = [];
  users: any[] = [];
  userId = 1; // Example user ID for demonstration
  activeUserId = 0;
  constructor(private service: AppService) {}

  ngOnInit(): void {
    console.log("App initialized");
    this.fetchInitialData();
  }

  fetchInitialData(): void {
    this.fetchProducts();
    this.fetchUsers();
    this.fetchBag();
  }

  showTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }

  fetchProducts(): void {
    this.service.getAllProducts().pipe(
      catchError(err => {
        console.error('Failed to fetch products:', err);
        return of([]); // Return an empty array on error
      })
    ).subscribe((data) => (this.products = data));
  }

  addToBag(productId: number): void {
    this.service.addProductToBag(productId, this.activeUserId).pipe(
      catchError(err => {
        alert('Failed to add product to bag.');
        console.error(err);
        return of(null);
      })
    ).subscribe(() => {
      alert('Product added to bag!');
      this.fetchBag();
    });
  }

  fetchBag(): void {
    this.service.getAllBags().pipe(
      catchError(err => {
        console.error('Failed to fetch bag:', err);
        return of([]);
      })
    ).subscribe((data) => (this.bag = data));
  }

  removeFromBag(productId: number, bagId: number): void {
    this.service.deleteProductFromBag(productId, bagId).pipe(
      catchError(err => {
        alert('Failed to remove product from bag.');
        console.error(err);
        return of(null);
      })
    ).subscribe(() => {
      this.fetchBag();
      alert('Product removed from bag!');
    });
  }

  checkout(): void {
    this.service.checkout(this.activeUserId).pipe(
      catchError(err => {
        alert('Failed to checkout.');
        console.error(err);
        return of('Checkout failed');
      })
    ).subscribe((message) => {
      alert(message);
      this.fetchBag();
    });
  }

  fetchUsers(): void {
    this.service.getAllUsers().pipe(
      catchError(err => {
        console.error('Failed to fetch users:', err);
        return of([]);
      })
    ).subscribe((data) => (this.users = data));
  }
selectUser(userId: number): void{
    this.activeUserId = userId;
  console.log('user selected: ', this.activeUserId);
}
  updateBalance(userId: number, amount: number): void {
    this.service.setUserBalance(userId, amount).pipe(
      catchError(err => {
        alert('Failed to update balance.');
        console.error(err);
        return of(null);
      })
    ).subscribe(() => {
      alert('Balance updated!');
      this.fetchUsers();
    });
  }
}
