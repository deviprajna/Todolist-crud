const ToDoList = require('..models/task_models.js')

const createTask = async (req, res) => {
    try {
        if (!req.body.title){
            return res.status(400).json({message: 'Title is required'});
        }
        const task = await ToDoList.create(req.body);
        res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const alltask = await ToDoList.find({}).sort({ createdAt: -1 });
        res.status(200).json(alltask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTaskbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const taskid = await ToDoList.findById(id);
        if (!ToDoList) {
            return res.status(400).json({ message: "Task not found" });
        }
        res.status(200).json(taskid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateid = await ToDoList.findById(id, req.body);
        if (!ToDoList) {
            return res.status(400).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Updated was suscessful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ToDoList.findById(id);
        if (!ToDoList) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskbyId,
    updateTask,
    deleteTask
};