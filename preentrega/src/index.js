const express = require ('express');
const appRoutes = require ('./routes/index');
const errorMiddleware = require ('./middlewares/error.middleware')
const app = express();

const envConfig = require ('./config');

const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container'),
  file: require('./models/containers/file.container'),
  memory: require('./models/containers/memory.container')
}

const datasource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', appRoutes);
app.use(errorMiddleware)

const connectedServer = app.listen(PORT, () => {
  datasource.connect().then(() => {
    console.log(`Escucho al servidor en el puerto: ${PORT}`);
    console.log('Conectado' + envConfig.DATASOURCE);
  })
    
  });
  