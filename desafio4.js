const express =require('express');
const {Router} =express;
const app =express();
const prodRouter =Router();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',prodRouter)


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
    

prodRouter.get('/productos',(req,res) =>{
    res.json(productos)

});

prodRouter.get('/productos/:id',(req,res) =>{

    const id= req.params.id;
    const prodId=productos.find(item=>item.id===id);
    res.json(prodId);

})

prodRouter.post('/productos',(req,res) =>{
    const prod= req.body; 
    productos.push(prod);   

    res.status(200).json({productos})

    const cantidadP=productos.length;
    console.log(cantidadP);
})


prodRouter.put('/productos/:id',(req,res) =>{
    
    const {id}= req.params;
    const {prodRep}=req.body;
    const index = id - 1;

    productos[index]=prodRep;
    
    res.json[200].json({prodRep});
})

prodRouter.delete('productos/:id',(req,res) =>{
    
    const {id}= req.params;
    const {prodDel}=req.body;
    const index = id - 1;

    delete productos[index];
    res.json[200].json(productos[index]);
})

const puerto=8080;

app.listen(puerto,() => console.log(productos))
app.on ('error', error => console.log('Error'));