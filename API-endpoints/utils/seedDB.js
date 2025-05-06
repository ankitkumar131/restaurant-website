const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/database');
const Product = require('../models/product.model');
const User = require('../models/user.model');

// Load environment variables
dotenv.config();

// Sample product data
const products = [
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce on a toasted bun.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3',
    category: ['burger', 'featured'],
    featured: true,
    ingredients: ['beef patty', 'cheese', 'lettuce', 'tomato', 'special sauce', 'bun'],
    nutrition: {
      calories: 550,
      fat: 35,
      carbs: 40,
      protein: 25
    },
    stock: 100
  },
  {
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a thin, crispy crust.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3',
    category: ['pizza', 'featured'],
    featured: true,
    ingredients: ['pizza dough', 'mozzarella cheese', 'tomatoes', 'basil', 'olive oil'],
    nutrition: {
      calories: 800,
      fat: 25,
      carbs: 100,
      protein: 30
    },
    stock: 50
  },
  {
    name: 'Tandoori Chicken',
    description: 'Tender chicken marinated in yogurt and spices, roasted to perfection in a tandoor oven.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3',
    category: ['chicken'],
    featured: false,
    ingredients: ['chicken', 'yogurt', 'tandoori masala', 'lemon', 'ginger', 'garlic'],
    nutrition: {
      calories: 450,
      fat: 20,
      carbs: 10,
      protein: 50
    },
    stock: 30
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a rich, creamy tomato-based gravy with aromatic spices.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-4.0.3',
    category: ['paneer'],
    featured: false,
    ingredients: ['paneer', 'tomatoes', 'butter', 'cream', 'garam masala', 'kasuri methi'],
    nutrition: {
      calories: 550,
      fat: 38,
      carbs: 25,
      protein: 22
    },
    stock: 40
  },
  {
    name: 'Mango Lassi',
    description: 'Refreshing yogurt-based drink blended with sweet mangoes and a hint of cardamom.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1553530979-5ede7368d9e0?ixlib=rb-4.0.3',
    category: ['drinks'],
    featured: false,
    ingredients: ['yogurt', 'mango', 'sugar', 'cardamom'],
    nutrition: {
      calories: 230,
      fat: 3,
      carbs: 45,
      protein: 9
    },
    stock: 80
  }
];

// Function to seed the database
const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted all existing products');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`Added ${createdProducts.length} products to the database`);
    
    // Create admin user if it doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@foofio.com';
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      console.log('Admin user created');
    }
    
    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeding function
seedDB(); 