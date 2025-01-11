# E-Commerce Application

A robust and modern e-commerce platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with features like user authentication, cart functionality, order tracking, and secure payment integration.

## Features

- **User Authentication**: Secure login, signup, and JWT-based token authentication.
- **Product Catalog**: Browse and filter products by categories.
- **Shopping Cart**: Add, update, and remove items from the cart.
- **Order Management**: Place orders, view order history, and track shipments.
- **Secure Payments**: Integrated with Stripe for secure online payments.
- **Delivery Tracking**: Integrated with FedEx/Shiprocket for real-time order tracking.
- **Responsive UI**: Optimized for all devices, including mobile and desktop.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **Shipping Integration**: Shiprocket, FedEx
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
