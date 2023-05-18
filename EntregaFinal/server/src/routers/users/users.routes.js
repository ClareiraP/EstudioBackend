const { Router } = require('express')
const {authMiddleware} = require('../../middleware/jwt.middleware')
const usersController = require('../../controllers/users.controller');

const router = Router();

router.get('/data', authMiddleware, usersController.getUserInfo);

module.exports = router;