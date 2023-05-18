// Imports
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors')
const { PORT } = require('./env.config');
const { logger } = require('./logger/logger')
const MongoContainer = require('./models/containers/mongo.containers')
const appRoutes = require('./routers/app.routes')
const { errorMiddleware } = require('./middleware/error.middleware')
const path = require('path');
const publicPath = path.join(__dirname, '..', '..', 'client', 'public');

const app = express()
const server = http.createServer(app);
const io = socketIO(server);


// Motores de Plantillas
//PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Socket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});


// Middlewares
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/api', appRoutes)
app.use(errorMiddleware)
app.all('*',(req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.render(path.resolve(__dirname, '../../client/public/error.ejs'), {
    code: 404,
    message: "Not Found",
  });
});


// Server
server.listen(PORT, () => {
  MongoContainer.connect().then(() => {
    logger.trace(` Server's up and runing on PORT: ${PORT} `);
    logger.trace('Connected to mongo ');
  })
})



module.exports = app;