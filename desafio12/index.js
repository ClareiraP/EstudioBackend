
const express = require ('express');
const { Server: HttpServer } = require ('http');
const { Server: SocketServer } = require ('socket.io');
const Products = require("./models/data");
const Messages = require ('./models/messages')
const dbConfig = require ('./db/config')
const routes = require('./routers/app.routers')
const MongoStore = require('connect-mongo')
const envConfig = require ('./env.config');
const passport = require('./middlewares/passport');
const MongoContainer = require('./models/containers/Mongodb.container')

const PORT = process.env.PORT || 8080;
const app = express();

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite)
const session = require('express-session');


app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
 
  secret: envConfig.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('sessions')
  }),
  cookie: {
      maxAge: 60000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(routes)


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

const connectedServer = httpServer.listen(PORT, () => {
    MongoContainer.connect()
    console.log(`🚀Server active and runing on port: ${PORT}`);
  });
  
  connectedServer.on("error", (error) => {
    console.log(`error:`, error.message);
  });