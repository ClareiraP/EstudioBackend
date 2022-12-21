const express =require('express');
const {Router} =express;
const app =express();
const prodRouter =Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', './views');
app.set('view engine', 'ejs');


const productos = [];


app.get('/', (req, res) => {
  res.render('form.ejs');
});

app.get('/productos', (req, res) => {
  let prod=productos.getAllProducts();
  req.render('productos',{prod});
});

app.post('/productos',  (req, res) => {
  const { nombre, precio, imagen } = req.body;
  productos.push({ nombre, precio, imagen });
  res.redirect('/');
});


const puerto=8080;

app.listen(puerto,() => console.log(productos))
app.on ('error', error => console.log('Error'));