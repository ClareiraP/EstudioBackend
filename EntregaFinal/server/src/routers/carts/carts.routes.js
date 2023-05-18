const { Router } = require('express')
const {authMiddleware} = require('../../middleware/jwt.middleware')
const {adminMiddleware} = require('../../middleware/jwt.middleware')
const CartsController = require('../../controllers/carts.controller')

const router = Router();

const cartsController= new CartsController();

router.post('/',authMiddleware, adminMiddleware, cartsController.createCart)
router.delete('/:id',authMiddleware, adminMiddleware, cartsController.deleteCart)
router.get('/:id/products', authMiddleware, cartsController.getProducts)
router.post('/:cartId/products/:prodId',authMiddleware, cartsController.saveProduct)
router.delete('/:cartId/products/:prodId',authMiddleware, cartsController.deleteProduct)
router.post('/:cartId/checkout', authMiddleware, cartsController.checkout)

  
module.exports = router