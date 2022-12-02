const fs = require('fs');
const path = require('path')

const dataAppender = (producto)=>{

    joined_path = path.join(__dirname,'/productos.txt')
    
    
    try{
        if (fs.existsSync(joined_path)){
            fs.appendFileSync(joined_path, `${JSON.stringify(producto)}\n`)
    
        }else{
            fs.writeFileSync(joined_path,`${JSON.stringify(producto)}\n`)
        }
    
        let fileData = fs.readFileSync(joined_path,'utf-8');
    
        console.log({fileData});
    }
    catch(e){
        console.log(e);
    }
}

let producto = [
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
    

dataAppender(producto)

