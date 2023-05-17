const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');
const authMiddleware = require('../middleware/authMiddleware');
const taskMiddleware = require('../middleware/taskMiddleware');

router.post(
  '/api/v1/task/delete',
  authMiddleware.authenticateToken,
  taskMiddleware.isOwner,
  taskController.deleteTask
);

router.post(
  '/api/v1/task/update',
  authMiddleware.authenticateToken,
  taskMiddleware.isOwner,
  taskController.updateTask
);

module.exports = router;
