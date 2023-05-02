const express = require('express');
const { Server: HttpServer } = require ('http');
const { Server: SocketServer } = require ('socket.io');
const Products = require('./src/models/data');
const Messages = require ('./src/models/messages')
const cors = require('cors');
const config = require('./src/config/env.config');
const dbConfig = require('./src/db/config');
const apiRoutes = require('./src/routers/app.routers');
const MongoStore = require('connect-mongo')
const passport = require('./src/middlewares/passport');
const session = require('express-session');
const MongoContainer = require('./src/models/containers/Mongodb.container')
const os = require('os')
const cluster = require('cluster');
const { cpus } = require('os')
const {
    logger,
    consoleLogger,
    infoLogger
  } = require('./src/middlewares/logger');
  const errorMiddleware = require('./src/middlewares/error');

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2), {
    alias: {
        p: "port",
    },
    default: {
        port: 8080,
    }
})

const PORT = argv.port
const clusterMode = process.argv[4] == "CLUSTER";


const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const productsDB = new Products('products', dbConfig.mariaDB);
const messagesDB = new Messages("messages", dbConfig.sqlite)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({

    secret: config.SESSION_SECRET,
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


app.get('/datos', async (req, res) => {
    consoleLogger.info("peticion a /datos, metodo get")
    const html = `Puerto: ${PORT}`
    res.send(html)
  });
  

app.use('/', apiRoutes);
app.use(errorMiddleware)
  
if (!clusterMode){
    infoLogger.info("Modo Fork");
  }
  
  if (clusterMode && cluster.isPrimary) {
    consoleLogger.info('Modo CLUSTER');
    const NUM_WORKERS = os.cpus().length = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
    cluster.on("exit", worker => {
      consoleLogger("Worker", worker.process.pid, "died", new Date().toLocaleDateString())
  })
  cluster.fork()
  } else {
    app.listen(PORT, () => {
      logger.trace(`Servidor escuchando en puerto: ${PORT}`);
      infoLogger.info(`PID WORKER ${process.pid}`)
  });
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

