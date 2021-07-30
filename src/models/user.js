const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  nombre: { type: String, require: true },
  correo: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model('User', UserSchema);
