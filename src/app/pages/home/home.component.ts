import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductGridComponent } from '../../components/products/product-grid/product-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductGridComponent],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-primary to-secondary bg-opacity-20">
        <div
          class="absolute inset-0 bg-cover bg-center z-0 opacity-20"
          style="background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
        ></div>
        <div class="container mx-auto px-4 z-10 animate-fade-in">
          <div class="max-w-2xl">
            <h1 class="text-5xl sm:text-6xl font-lobster mb-6 text-highlight">
              Delicious food crafted with passion
            </h1>
            <p class="text-lg sm:text-xl mb-8 text-dark">
              Experience the joy of authentic flavors in our handcrafted dishes made with
              the finest ingredients.
            </p>
            <div class="space-x-4">
              <a
                [routerLink]="['/catalog']"
                class="btn-vibrant px-6 py-3 rounded-md inline-block"
              >
                Order Now
              </a>
              <a
                [routerLink]="['/about']"
                class="bg-accent text-dark px-6 py-3 rounded-md inline-block font-medium hover:bg-opacity-90"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-16 bg-light">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-lobster mb-4 text-primary">
              Featured Dishes
            </h2>
            <p class="text-gray-700 max-w-2xl mx-auto">
              Discover our most loved dishes and chef's specials that will
              tantalize your taste buds.
            </p>
          </div>

          <app-product-grid [products]="featuredProducts"></app-product-grid>

          <div class="text-center mt-12">
            <a
              [routerLink]="['/catalog']"
              class="bg-secondary hover:bg-secondary text-white px-6 py-3 rounded-md inline-block font-medium"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16 bg-accent bg-opacity-20">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-lobster mb-4 text-primary">
              Explore Categories
            </h2>
            <p class="text-gray-700 max-w-2xl mx-auto">
              Browse through our delicious selection of food categories.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (category of categories; track category.name) {
              <a
                [routerLink]="['/catalog']"
                [queryParams]="{ category: category.category }"
                class="relative overflow-hidden rounded-lg aspect-square group"
              >
                <img
                  [src]="category.image"
                  [alt]="category.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent flex items-end p-6">
                  <h3 class="text-white text-xl font-lobster">{{ category.name }}</h3>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-16 bg-light">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-lobster mb-4 text-primary">
              What Our Customers Say
            </h2>
            <p class="text-gray-700 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our happy customers have
              to say about FOOFIO.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (testimonial of testimonials; track testimonial.name) {
              <div
                class="bg-white p-6 rounded-lg shadow-md border border-accent"
              >
                <div class="flex items-center space-x-1 mb-4">
                  @for (star of [1, 2, 3, 4, 5]; track star) {
                    <svg
                      class="w-5 h-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  }
                </div>
                <p class="text-gray-700 mb-4">{{ testimonial.text }}</p>
                <p class="font-medium text-highlight">{{ testimonial.name }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-16 bg-secondary bg-opacity-20">
        <div class="container mx-auto px-4">
          <div class="max-w-xl mx-auto text-center">
            <h2 class="text-3xl font-lobster mb-4 text-primary">
              Join Our Newsletter
            </h2>
            <p class="text-gray-700 mb-6">
              Subscribe to get special offers, free giveaways, and updates on our new menu items.
            </p>
            <form class="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                class="flex-1 px-4 py-3 rounded-md border border-gray-300"
                required
              />
              <button type="submit" class="btn-vibrant px-6 py-3 rounded-md whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  
  featuredProducts: Product[] = [];
  
  categories = [
    {
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "burger",
    },
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "pizza",
    },
    {
      name: "Chicken",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "chicken",
    },
    {
      name: "Paneer",
      image: "https://sukhis.com/app/uploads/2013/02/Sukhis-Paneer-Tikka-Masala.jpg",
      category: "paneer",
    },
  ];
  
  testimonials = [
    {
      name: "Raj Kumar",
      text: "The food at FOOFIO is absolutely divine! I ordered their special paneer butter masala and everyone was impressed by both the taste and presentation.",
    },
    {
      name: "Mike Thompson",
      text: "Best burgers in town! I stop by every weekend for their signature FOOFIO burger. The staff is always friendly and the food is always fresh.",
    },
    {
      name: "Priya Sharma",
      text: "Their tandoori chicken is to die for! Perfect flavor and the accompanying gravy is just right. Will definitely be ordering again.",
    },
  ];

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
  }
}