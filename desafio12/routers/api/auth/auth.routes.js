const express = require ('express');
/* const path = require('path'); */
const passport = require('../../../middlewares/passport')

const router = express.Router();


router.post(
    '/register', 
    passport.authenticate('signup', { 
        failureRedirect: '/signupError', 
        successRedirect: '/profile' })
        );

router.post(
    '/login', 
    passport.authenticate('signin', { 
        failureRedirect: '/loginError', 
        successRedirect: '/profile' })
        );
        

module.exports = router;