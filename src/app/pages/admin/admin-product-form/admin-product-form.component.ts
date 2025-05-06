import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  isSubmitting = false;
  isAuthenticated = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check authentication status
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
      console.log('Authentication status:', isAuth);
    });
    
    // Check if we're in edit mode
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
      category: ['featured', [Validators.required]], // Default to featured category
      image: ['', [Validators.required]],
      featured: [false]
    });
  }

  loadProduct(id: string): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          image: product.image,
          featured: product.featured
        });
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.toastService.error('Error', 'Failed to load product details');
        this.router.navigate(['/admin/products']);
      }
    });
  }

  loginAsAdmin(): void {
    // Try to log in as admin with default credentials
    this.authService.login('admin@example.com', 'admin123').subscribe({
      next: (user) => {
        console.log('Logged in as admin:', user);
        this.toastService.success('Success', 'Logged in as admin');
      },
      error: (error) => {
        console.error('Admin login failed:', error);
        this.toastService.error('Error', 'Admin login failed. Please check credentials');
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.toastService.error('Error', 'Please fill all required fields');
      return;
    }
    
    // Check if authenticated
    if (!this.isAuthenticated) {
      this.toastService.error('Authentication Error', 'You must be logged in as admin to create products');
      this.loginAsAdmin(); // Try to log in automatically
      return;
    }
    
    this.isSubmitting = true;
    
    // Get the form values
    const formValues = this.productForm.value;
    
    // Properly format the category
    let categoryValue = formValues.category;
    if (!categoryValue || (Array.isArray(categoryValue) && categoryValue.length === 0)) {
      categoryValue = ['featured']; // Default to featured if empty
    } else if (!Array.isArray(categoryValue)) {
      categoryValue = [categoryValue]; // Convert to array if not already
    }
    
    // Create product data with properly formatted category
    const productData = {
      ...formValues,
      category: categoryValue
    };
    
    console.log('Submitting product data:', productData);
    
    if (this.isEditMode && this.productId) {
      // Update existing product
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.toastService.success('Product updated', 'The product has been successfully updated');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.toastService.error('Error', 'Failed to update product: ' + (error.error?.message || error.message || 'Unknown error'));
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.toastService.success('Product created', 'The product has been successfully created');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.toastService.error('Error', 'Failed to create product: ' + (error.error?.message || error.message || 'Unknown error'));
          this.isSubmitting = false;
        }
      });
    }
  }
}
