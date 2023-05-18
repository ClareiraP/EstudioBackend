const { Router } = require('express')
const {authMiddleware} = require('../../middleware/jwt.middleware')
const {adminMiddleware} = require('../../middleware/jwt.middleware')
const ProductsController = require('../../controllers/products.controller');

const productsController = new ProductsController()

const router= Router();



router.get('/', authMiddleware, productsController.getProducts);
router.get('/:id', authMiddleware, productsController.getProductById);
router.get("/category/:category", authMiddleware, productsController.getProductsByCategory);
router.post('/',authMiddleware, adminMiddleware, productsController.saveProduct);
router.put('/:id',authMiddleware, adminMiddleware, productsController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productsController.deleteProduct);


module.exports = router