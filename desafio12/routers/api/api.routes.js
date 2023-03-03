const express = require('express');
const authRoutes = require('./auth/auth.routes');
const infoRoutes = require('./info/info.routes');
const randomsRoutes = require('./randoms/randoms.routes');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);
/* router.use('/info', infoRoutes) */
/* router.use('/randoms', randomsRoutes) */

module.exports = router;