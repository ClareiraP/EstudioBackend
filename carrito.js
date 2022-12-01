
/*const frutas=[];

const fruta = prompt("Que fruta querés a comprar?");

frutas.push(fruta);

while (confirm("desea algo más?")){
    const fruta = prompt ("agregue la fruta que desea");
    frutas.push(fruta);
}

console.log("compraste");
for (const fruta of frutas) {
    console.log(fruta);
}

// lo mismo con forEach

frutas.forEach(fruta =>console.log(fruta))

//otra forma, con índice

frutas.forEach((fruta,index) => (
    console.log(`${index}: ${fruta}`);
));

*/

//fc. declarativa

/*function numeroAleatorio(min,max){
    return Math.floor(Math.random()*(max-min))
    + min;
   
}
console.log(numeroAleatorio(10,21));

//fc. expresada (lo que retornamos va a una variable)
const numAzar=function(min,max){
    return Math.floor(Math.random()*(max-min))
    + min;
}

console.log (numAzar(100,201));
*/

/*
// fc. flecha
const azarFlecha=(min,max)=> (Math.floor(Math.random()*(max-min))
    + min);

console.log(azarFlecha(1,11))
*/

const gato={
    nombre:"valiente",
    duerme: true,
    edad:10,
    enemigos:["agua","perro"]
};

console.log (gato.nombre);
console.log(gato["nombre"]);  //para acceder a un objeto, con corchetes
console.log(gato.enemigos[0]);

//crear nuevas propiedades

gato.color ="azul";
gato.edad=11;
delete gato.duerme;

console.log(gato)