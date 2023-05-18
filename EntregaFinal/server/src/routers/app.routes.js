const path = require('path');
const express = require('express');
const {logger} = require('../logger/logger')
const productsRoutes = require('./products/products.routes');
const cartsRoutes = require('./carts/carts.routes');
const authRoutes = require('./auth/auth.routes');
const usersRoutes = require('./users/users.routes');
const ordersRoutes = require('./orders/orders.routes');
const infoServerRoute = require('./info/info.routes');
const {authMiddleware} = require('../middleware/jwt.middleware');
const messagesRoutes = require('./messages/messages.routes')
const router = express.Router();

router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/orders', ordersRoutes);
router.use('/info', infoServerRoute);
router.use('/chat', messagesRoutes);

router.get('/auth/register', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/public/register.html'))
})
router.get('/auth/login', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/public/login.html'))
})
router.get('/profile', async(req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/public/profile.html'))
})
router.get('/chat', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/public/formChat.html'))
});


module.exports = router