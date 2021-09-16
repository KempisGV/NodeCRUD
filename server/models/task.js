const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, min: 1 },
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
