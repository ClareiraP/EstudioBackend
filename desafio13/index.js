
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
const session = require('express-session');
const MongoContainer = require('./models/containers/Mongodb.container')
const os = require('os')
const cluster = require('cluster');
const argv = require('minimist')(process.argv.slice(2), {
    alias: {
        p: "port",
        m: "mode"
    },
    default: {
        port: 8080,
        mode: "Fork"
    }
})

const PORT = argv.port

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite)



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

if (argv.mode === 'Cluster' && cluster.isPrimary) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
      cluster.fork();
  }
} else {
  
    const serverConnected = httpServer.listen(PORT, () => {
      MongoContainer.connect()
            .then(() => {
                console.log('Connected to DB!');
                console.log(process.pid, `==> 🚀Server active and runing on port: ${PORT}`);
            });
    })

    serverConnected.on('error', (error) => {
        console.log(error.message)
    })
}


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


