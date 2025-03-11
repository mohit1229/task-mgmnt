const mongoose = require("mongoose");

const Task = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
