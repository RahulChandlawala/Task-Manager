const Task = require("../modals/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ sucess: true, data: { tasks } });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
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
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }

    res.status(200).json({ id: taskId, task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const tasks = await Task.findOneAndDelete({ _id: taskId });
    if (!tasks) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }
    res.status(200).json({ tasks });
    // res.status(200).send();
    // res.status(200).json({
    //   task: null,
    //   status: "success",
    // });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
