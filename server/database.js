const mongoose = require('mongoose');
const password = 'KGkerRI84lxMs3uy';
const database = 'nodecrud';
const keys = require('./config/keys')

mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
