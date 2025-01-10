const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Initialize Express App
const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mahajanshobhit38:Smahajan89@cluster0.lh1sx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// product model
const Product = mongoose.model('Product', new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
}));
// cart model
const Cart = mongoose.model('Cart', new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    userId: { type: String, required: true },
}));
//user model
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}));

// Middleware for Authentication
const authenticateToken = (req, res, next) => {
               const token = req.headers['authorization']?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Routes

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Get single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Add product to cart
app.post('/cart', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required.' });
    }
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Not enough stock available.' });
        }
        const cartItem = new Cart({ productId, quantity, userId: req.user.userId });
        await cartItem.save();
        res.status(201).json({ message: 'Product added to cart.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Update cart item quantity
app.put('/cart/:id', authenticateToken, async (req, res) => {
    const { quantity } = req.body;
    if (!quantity) {
        return res.status(400).json({ error: 'Quantity is required.' });
    }
    try {
        const cartItem = await Cart.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found.' });
        }
        const product = await Product.findById(cartItem.productId);
        if (product.stock < quantity) {
            return res.status(400).json({ error: 'Not enough stock available.' });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json({ message: 'Cart updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Delete cart item
app.delete('/cart/:id', authenticateToken, async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found.' });
        }
        res.json({ message: 'Cart item removed.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
