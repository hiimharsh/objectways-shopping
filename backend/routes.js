const { getProducts } = require('./controllers/products');
const { getCartProducts, addToCart, removeFromCart } = require('./controllers/cart');

const Router = require('express').Router;

const route = Router();

route.get('/products', getProducts);
route.get('/cartproducts', getCartProducts);
route.post('/addToCart', addToCart);
route.delete('/removeFromCart', removeFromCart);

module.exports = route;