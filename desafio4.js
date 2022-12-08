const express =require('express');
//const {Router} =express;
const app =express();
//const appRouter =Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use(express.static('publico'));

//const productos = [];
const productos = [
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
    res.json(productos)
});

app.get('/api/productos/:id',(req,res) =>{

    const id= req.params.id;
    res.json(productos[id])
})


app.post('/api/productos',(req,res) =>{
    const prod= req.body; 
    productos.push(prod);   
    res.status(200).json({added: prod})
})


app.put('/api/productos/:id',(req,res) =>{
    
    const id= req.params;
    const prod=req.body;
    const index = id - 1;
    
    productos[index]=prod;
    res.json(productos[index])
})


app.delete('/api/productos/:id',(req,res) =>{
    
    const id= req.params;
    const index = id - 1;
    
    delete productos[index];
    res.json(productos[index])
})

//app.use('/api/productos',appRouter);

const puerto=8080;

app.listen(puerto,() => console.log(productos))
app.on ('error', error => console.log('Error'));