const asyncWrapper = require("../middleware/async");
const Task = require("../modals/task");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ sucess: true, data: { tasks } });
});

const createTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;
  const task = await Task.create({ name, completed });
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const { name, completed } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "Please provide all values" });
  }
  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { name, completed },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({ id: taskId, task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const tasks = await Task.findOneAndDelete({ _id: taskId });
  if (!tasks) {
    // return res.status(404).json({ msg: `No task with id : ${taskId}` });
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({ tasks });
  // res.status(200).send();
  // res.status(200).json({
  //   task: null,
  //   status: "success",
  // });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
    // const error = new Error("Task not found");
    // error.status = 404;
    // return next(error);
    // return res.status(404).json({ msg: `No task with id : ${taskId}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
