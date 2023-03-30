const express = require ('express');
const router = express.Router();
const productsRoutes = require ('./products/products.routes.js')
const cartRoutes = require ('./cart/cart.routes.js')


router.use('/products', productsRoutes);
router.use('/carts', cartRoutes);


module.exports = router;