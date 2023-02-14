const express = require ('express');
const router = express.Router();
const auth = require('./web/auth');
const home = require('./web/home');

router.use('/', auth);
router.use('/', home);


module.exports = router