
const express = require ('express');
const router = express.Router();
const cartController = require ('../../controllers/cart.controller')

router.get('/', cartController.getCarts);
router.post('/', cartController.createCart);
router.get('/:idCart', cartController.getOneCart);
router.get('/:idCart/products', cartController.getProductsCart);
router.delete('/:idCart', cartController.deleteOneCart);

router.post('/:idCart/products/:idProd', cartController.saveOneProductCart); 
router.delete('/:idCart/products/:idProd', cartController.deleteOneProductCart);

module.exports = router;