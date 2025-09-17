const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name for task"],
    trim: true,
    maxLength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
