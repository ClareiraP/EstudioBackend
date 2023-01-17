// Prueba de fetch para el desafio

const express = require ('express');// como siempre importar libreria de express
const { Server: HttpServer } = require ('http');//los dos puntos son para cambiarle el nombre al servidor
const { Server: SocketServer } = require ('socket.io');//importamos libreria de websocket
const Products = require("./model/data");
const Messages = require ('./model/messages')
const dbConfig = require ('./db/config')

const PORT = process.env.PORT || 8080;// definimos puerto
const app = express();//definimos constante para nuestro servidor
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite)


app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const users = [];


io.on("connection", async (socket) => {
    console.log(`New User conected!`);
    console.log(`User ID: ${socket.id}`)


   const products = await productsDB.getAll();
   socket.emit('products', products);

   socket.on('newProduct', async (newProduct) => {
       await productsDB.save(newProduct);
       const updateProducts = await productsDB.getAll(); 
       io.emit('products', updateProducts)      
    });   

   
    socket.on("new-user", (username) => {
     const newUser = {
       id: socket.id,
       username: username,
     };
     users.push(newUser);
    });
    
    const messages= await messagesDB.getMessages();
    socket.emit("messages", messages);
   
    socket.on("new-message", async (msj) => {
        await messagesDB.addMessage({email: msj.user, message: msj.message, date: new Date().toLocaleDateString()});
        const messagesLog = await messagesDB.getMessages();
        io.emit("messages", {messagesLog});
    })
})



//Conexión del Servidor
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`🚀Server active and runing on port: ${PORT}`);
  });
  
  connectedServer.on("error", (error) => {
    console.log(`error:`, error.message);
  });