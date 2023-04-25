const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');
const {
    consoleLogger,
    errorLogger,
  } = require("../middlewares/logger");
  
const router = express.Router();


router.use('/api', apiRoutes);


router.get('/', (req, res) => {
    consoleLogger.info('peticion a / get')
    res.sendFile('index.html', {root: './src/public'})
})

router.get('/login', async(req, res) => {
    consoleLogger.info('peticion a /login get')
    res.sendFile('login.html', {root: './src/public'})})
  
router.get('/register', async(req, res) => {
    consoleLogger.info('peticion a /register, get')
    res.sendFile('register.html', {root: './src/public'})})

router.get('/profile', auth, async (req, res) => {
    consoleLogger.info('peticion a /profile, get');
    const user = req.user;
    res.render(path.resolve('src/public/views/profile.ejs'), { username: user.firstname });
  });
  
  router.get('/logout', auth, (req, res, next) => {
    consoleLogger.info('peticion a /logout, get');
    consoleLogger.info('usuario deslogueado');
    req.logOut(() => {
      console.log('User logued out');
      res.redirect('/');
    })
  })


module. exports = router;