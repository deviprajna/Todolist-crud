const ToDoList = require('../models/task_models.js');

const createTask = async (req, res) => {
    try {
        if (!req.body.title){
            return res.status(400).json({ success: false, message: 'Title is required' });
        }
        const task = await ToDoList.create(req.body);
        res.status(201).json({ success: true, data: task, message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const alltask = await ToDoList.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: alltask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTaskbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const taskid = await ToDoList.findById(id);
        if (!taskid) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, data: taskid });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await ToDoList.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: updated, message: 'Update was successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ToDoList.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, data: deleted, message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskbyId,
    updateTask,
    deleteTask
};