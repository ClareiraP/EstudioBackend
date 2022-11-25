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
        fs.writeFile(txtarchivo,JSON.stringify(objeto));
    } catch(err){
        console.log('Error: ${err}')
    }
    }
}
