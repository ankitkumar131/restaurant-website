import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-semibold mb-8 text-brand-darkBrown">Your Profile</h1>
      
      <div *ngIf="isLoading" class="text-center py-8">
        <div class="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600">Loading your profile...</p>
      </div>
      
      <div *ngIf="!isLoading && user" class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div class="flex items-center mb-6">
          <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {{ user.name.charAt(0) }}
          </div>
          <div class="ml-4">
            <h2 class="text-xl font-semibold">{{ user.name }}</h2>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
        </div>
        
        <div class="border-t pt-6 mt-6">
          <h3 class="text-lg font-semibold mb-4">Profile Information</h3>
          
          <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="profileData.name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="profileData.email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  readonly
                >
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  [(ngModel)]="profileData.phone" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  [(ngModel)]="profileData.address" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <div>
                <span *ngIf="message" [class]="messageType === 'success' ? 'text-green-600' : 'text-red-600'">
                  {{ message }}
                </span>
              </div>
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                [disabled]="isSubmitting"
              >
                {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
        
        <div class="border-t pt-6 mt-8">
          <h3 class="text-lg font-semibold mb-2">Account Settings</h3>
          <p class="text-sm text-gray-600 mb-4">Manage your account security and preferences.</p>
          
          <div class="space-y-4">
            <a 
              routerLink="/change-password" 
              class="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Change Password
            </a>
            
            <a 
              routerLink="/orders" 
              class="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              View Order History
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileData: Partial<User> = {};
  isLoading = true;
  isSubmitting = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.loadUserProfile();
  }
  
  loadUserProfile(): void {
    this.isLoading = true;
    this.authService.fetchCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.profileData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address
        };
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Failed to load profile: ' + error.message;
        this.messageType = 'error';
        this.isLoading = false;
      }
    });
  }
  
  updateProfile(): void {
    this.isSubmitting = true;
    this.message = '';
    
    this.authService.updateProfile(this.profileData).subscribe({
      next: (user) => {
        this.user = user;
        this.message = 'Profile updated successfully';
        this.messageType = 'success';
        this.isSubmitting = false;
      },
      error: (error) => {
        this.message = 'Failed to update profile: ' + error.message;
        this.messageType = 'error';
        this.isSubmitting = false;
      }
    });
  }
} 