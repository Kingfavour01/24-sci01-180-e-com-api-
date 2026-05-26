const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;
const DATA_PATH = path.join(__dirname, 'data', 'products.json');

app.use(express.json());

// Read (GET)
app.get('/api/v1/products', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        const products = JSON.parse(data);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error reading products' });
    }
});

// Create (POST)
app.post('/api/v1/products', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...req.body
        };
        products.push(newProduct);
        fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

// Update (PATCH)
app.patch('/api/v1/products/:id', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        const id = parseInt(req.params.id);
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        products[productIndex] = { ...products[productIndex], ...req.body };
        fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2));
        res.status(200).json(products[productIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Delete (DELETE)
app.delete('/api/v1/products/:id', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
        const id = parseInt(req.params.id);
        const filteredProducts = products.filter(p => p.id !== id);

        if (products.length === filteredProducts.length) {
            return res.status(404).json({ message: 'Product not found' });
        }

        fs.writeFileSync(DATA_PATH, JSON.stringify(filteredProducts, null, 2));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

app.listen(PORT, () => {
    console.log(Server is running on port );
});
