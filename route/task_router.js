const express = require('express');
const router = express.Router();
const ToDoList = require('../models/task_models.js');
const { createTask, getAllTasks, getTaskbyId, updateTask, deleteTask } = require('../controller/task_controller.js');

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskbyId);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;