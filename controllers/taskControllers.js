const Task = require('../models/task');

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.body.task_id);
    if (!task) {
      return res.status(500).json({ message: 'Task not found', status: 'fail' });
    }

    return res.status(200).json({ message: 'Task deleted successfully', status: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: 'fail' });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.body.task_id,
      {
        $set: {
          heading: req.body.heading,
          description: req.body.description,
          status: req.body.status
        }
      },
      { new: true }
    );

    if (!task) {
      return res.status(500).json({ message: 'Task not found', status: 'fail' });
    }

    return res.status(200).json({ status: 'success', data: task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: 'fail' });
  }
};

module.exports = {
  deleteTask,
  updateTask
};
