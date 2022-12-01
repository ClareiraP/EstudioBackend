const express = require('express');
const app =express();

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

app.get('/productos',function(rep,res) {
    res.send(productos);
})

const puerto=8080;
/*
app.listen(puerto, () => {
    console.log(productos)
  });*/

const min=0;
const max=productos.length;

const productosRandom =function(min,max){
    return Math.floor(Math.random()*(max-min))
    + min;
}

prodRan=productosRandom(min,max)

  app.get('/productosRandom',function(rep,res) {
    res.send(prodRan);
})

app.listen(puerto, () => {
    console.log(productos[prodRan])
  });


app.on ("error", error => console.log('Error'));
