const mongoose = require('mongoose');


mongoose
  .connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));

module.exports = mongoose;
