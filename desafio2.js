const fs = require('fs');

let txtarchivo='./textoAleatorio';
try{
    fs.writeFileSync(txtarchivo,'hola a todos');
    console.log('archivo listo');
} catch (err){
    console.error(err)
}

class Contenedor {
    constructor(txtarchivo) {
    this.txtarchivo = txtarchivo;
}

    getAll(){
        try{
            const txtObjeto = fs.readFile(txtarchivo);
            return (txtObjeto);
        } catch(err){
            console.log('Error: ${err}')
        }
    }
   
    saveFile(txtarchivo,objeto){
     try{
       const read =fs.readFileSync(txtarchivo, "utf8");
       const write = fs.writeFile(read,JSON.stringify(objeto));
       console.log (write)
     } catch(err){
        console.log('Error: ${err}')
       }
    }
}


const contenedor = new Contenedor([nombre="producto1", precio="precio1"]);
contenedor.getAll();

