# E-Commerce Application

A robust and modern e-commerce platform built using the  MongoDB, Express.js,  Node.js with features like user authentication, cart functionality

## Features

- **User Authentication**: Secure login, signup, and JWT-based token authentication.
- **Product Catalog**: Browse and filter products by categories.
- **Shopping Cart**: Add, update, and remove items from the cart.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
2. **Install Dependencies:**:
   ```bash
   npm install
3. **Run the Application:**:
   ```bash
   node server.js

### API Endpoints

**Authentication** : POST /auth/signup: User registration.
                     POST /auth/login: User login.
**Products**       : GET /products: Fetch all products.
                     GET /products/:id: Fetch product details.
**Cart**           : POST /cart: Add item to the cart.
                     GET /cart: Get all items in the cart.

**Screenshot added in a screenshot folder of Postman** 
