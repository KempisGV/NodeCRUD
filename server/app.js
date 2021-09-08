const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('passport');
require('./models/user');

const { mongoose } = require('./database');
//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev')); //sirve para tener información sobre cuanto tiempo tardo para la petición, código de error, etc
app.use(express.json()); //comprueba si la información que llega es un json y así mismo se podrán enviar archivos con formato json
app.use(cors());
app.use(passport.initialize());

//Config
require('./config/passport')(passport);

//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
