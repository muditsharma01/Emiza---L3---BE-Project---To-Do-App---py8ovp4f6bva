const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const isOwner = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(404).json({ message: 'Invalid token', status: 'fail' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({ message: 'Invalid token', status: 'fail' });
    }

    const task = await Task.findById(req.body.task_id);
    if (!task) {
      return res.status(404).json({ message: 'Given task does not exist', status: 'fail' });
    }

    if (task.creator_id !== decoded.userId) {
      return res.status(403).json({ message: 'Access Denied', status: 'fail' });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, status: 'fail' });
  }
};

module.exports = {
  isOwner
};
