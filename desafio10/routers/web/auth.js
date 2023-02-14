const express = require ('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.redirect('/home');
})

router.get('/login', (req, res) => {
    const name = req.session?.name
    if(name){
        res.redirect('/');
    } else {
        res.sendFile('Users/cpereira.CEGC/Desktop/EstudioBackend/DESAFIO10/public/login.html');
    }
    })

router.get('/logout', (req, res) => {
    const name = req.session?.name
    if (name) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), './public/logout.ejs'), { name })
                /* res.send(`<h4>Hasta luego, ${name}</h4><a href="/">Volver a Inicio</a>`) */
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

router.post('/login', (req, res) => {
    const { name } = req.body;
    console.log(name);
    req.session.name = name
    res.redirect('/');
})







module.exports = router;