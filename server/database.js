const mongoose = require('mongoose');
const password = 'KGkerRI84lxMs3uy';
const database = 'nodecrud';

const URI = `mongodb+srv://Kempis:${password}@cluster0.q3zod.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
