
class Usuario {
    constructor(nombre,apellido,mascotas,libros) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mascotas = mascotas;
        this.libros = libros;
    }

    // Nombre completo
    getFullName() { 
        return (`${this.nombre} ${this.apellido}`);     
    }

    // Agregar mascotas
    addMascotas(txtMascota) {
        this.mascotas.push(txtMascota);
    }

    //Eliminar la última mascota
    removeMascotas() {
        this.mascotas.pop();
    }

    //Contar la cantidad de mascotas
    countMascotas() {
       return (this.mascotas).length;    
    }

  //Agregar libros
    addLibros(txttitulo,txtautor) {
        this.libros.push({nombre:txttitulo,autor:txtautor});
    }

     //Quitar libros
     removeLibros() {
        this.libros.pop();
    }

    // Libros del usuario
    getBookNames() { 
        return this.libros;   
    }   
}

const usuario = new Usuario("Ana","Gonzalez",["mia","elunei"],
[{nombre:"El señor de los anillos",autor:"Tolkien"},{nombre:"El poder de las palabras",autor:"Sigman"}]);

 let nombre= usuario.getFullName();
 console.log (nombre)
 
 usuario.addMascotas("Misha");

 let cantmascotas= usuario.countMascotas();
 console.log("EL usuario tiene", cantmascotas , " mascotas.");

 usuario.addLibros("Cien años de soledad", "García Marquez");
  
 let libritos= usuario.getBookNames();
 console.log ("Los libros del usuario:",libritos);
 

