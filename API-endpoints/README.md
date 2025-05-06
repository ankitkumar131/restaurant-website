# FOOFIO Restaurant API

This is the backend API for the FOOFIO Restaurant application. It provides endpoints for products, cart, orders, authentication, and admin functions.

## Database Setup

The API uses MongoDB as its database. Follow these steps to set up a new database:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation or MongoDB Atlas account)

### Environment Setup

1. Create a `.env` file in the root of the API-endpoints directory using the template in `config/env.sample.js`
2. Configure your database settings:

```
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/foofio-restaurant
DB_NAME=foofio-restaurant
```

- To use a local MongoDB instance, keep the default settings
- To use MongoDB Atlas, update MONGODB_URI with your connection string

### Initial Database Setup

Run the following command to seed the database with initial products and admin user:

```bash
node utils/seedDB.js
```

This will:
- Connect to your configured database
- Create initial product entries
- Create an admin user if one doesn't exist

### Default Admin Credentials

- Email: admin@foofio.com
- Password: admin123

## Running the API

To start the API server:

```bash
npm start
```

The server will run on port 5000 by default (http://localhost:5000/api).

## API Endpoints

### Authentication

- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login and get JWT token
- GET `/api/auth/me` - Get current user profile

### Products

- GET `/api/products` - Get all products (supports filtering by category)
- GET `/api/products/:id` - Get a specific product
- POST `/api/products` - Create a new product (admin only)
- PATCH `/api/products/:id` - Update a product (admin only)
- DELETE `/api/products/:id` - Delete a product (admin only)

### Cart

- GET `/api/cart` - Get user's cart
- POST `/api/cart/add` - Add item to cart
- PATCH `/api/cart/update` - Update cart item quantity
- DELETE `/api/cart/remove/:itemId` - Remove item from cart

### Orders

- GET `/api/orders` - Get user's orders
- POST `/api/orders` - Create a new order
- GET `/api/orders/:id` - Get a specific order

### Admin

- GET `/api/admin/users` - Get all users (admin only)
- GET `/api/admin/orders` - Get all orders (admin only)
- PATCH `/api/admin/orders/:id` - Update order status (admin only)

## Troubleshooting

If you encounter issues with the database connection:

1. Verify MongoDB is running
2. Check your connection string in the .env file
3. Ensure your network allows connections to the database
4. Check MongoDB Atlas IP whitelist if using cloud database 