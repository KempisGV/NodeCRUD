const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: { type: Array },
});

module.exports = mongoose.model('User', UserSchema);
