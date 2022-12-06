const express =require('express');
const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let productos = [
    {
        id: 1,
        nombre: 'Patata',
        precio: 1,
        imagen: 'patata.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.2,
        imagen: 'cebolla.jpg'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2.1,
        imagen: 'calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 0.6,
        imagen: 'fresas.jpg'
    }];

app.get('/api/productos',(req,res) =>{
    res.json({productos})
})


app.get('/api/productos/:id',(req,res) =>{
    
    const id= req.params.id;
    const index = id - 1;

    res.json(productos[index])
})


app.post('/api/productos',(req,res) =>{
    const {prod}= req.body; //tengo el producto
    productos.push({prod})    
    res.json({prod})
})


app.put('/api/productos/:id',(req,res) =>{
    
    const {id}= req.params;
    const {prod}=req.body;
    const index = id - 1;
    
    productos[index]={prod};
    res.json(productos[index])
})

app.delete('/api/productos/:id',(req,res) =>{
    
    const {id}= req.params;
    const index = id - 1;
    
    delete productos[index];
    res.json(productos[index])
})

app.listen(8080,() => console.log(productos))
app.on ("error", error => console.log('Error'));