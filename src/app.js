const express = require('express');
const morgan = require('morgan');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev')); //sirve para tener información sobre cuanto tiempo tardo para la petición, código de error, etc
app.use(express.json()); //comprueba si la información que llega es un json y así mismo se podrán enviar archivos con formato json

//Routes

//Static files

//Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
