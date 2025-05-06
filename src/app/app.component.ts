import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  currentUser: User | null = null;
  cartItemCount = 0;
  
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  
  ngOnInit() {
    // Subscribe to authentication state changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    });
    
    // Initial authentication state
    this.isAuthenticated = this.authService.isAuthenticated;
    this.currentUser = this.authService.currentUser;
    
    // Subscribe to cart changes
    this.cartService.items$.subscribe(() => {
      this.cartItemCount = this.cartService.totalItems;
    });
  }
  
  logout() {
    this.authService.logout().subscribe(() => {
      // Authentication state will be updated by the subscription
    });
  }
}
