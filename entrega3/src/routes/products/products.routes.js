
const express = require ('express');
const router = express.Router();
const productsController = require ('../../controllers/products.controller')


router.get('/', productsController.getAllProducts);
router.get('/:idProduct', productsController.getProductId);
router.post('/', productsController.saveNewProduct);
router.put('/:idProduct', productsController.updateOneProduct);
router.delete('/:idProduct', productsController.deleteOneProduct);
  
module.exports = router;