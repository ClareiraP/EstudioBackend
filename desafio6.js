const express =require('express');
const app =express();
const handlebars =require('express-handlebars');

app.engine(
    'hbs',//nombre de ref a la plantilla
    handlebars({  //fc config.hadlevars
        extname:'.hbs', //extension a utilizar
        defaultLayout:'index.hbs', //plantilla principal
        layoutsDir:__dirname+'/views/layouts', //ruta a la plantilla ppal
        partialDir:__dirname+'/views/partials/'
    }))

    app.set('view engine','hbs'); //motor de plantilla que se utiliza
    app.set('views','./views');//directorio donde estan los archivos
app.use(express.static('public')); //espacio publico servidor