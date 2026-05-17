const ToDoList = require('..models/task_models.js')

const createTask = async (req, res) => {
    try {
        const task = await ToDoList.create(req.body);
        res.status(200).json(task);  
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}; 

const getAllTasks = async (req, res) => {
    try{
        const alltask = await ToDoList.find({});
        res.status(200).json(alltask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTaskbyId =async (req, res) => {
    try {
        const {id} = req.params;
        const taskid = await ToDoList.findById(id);
        res.status(200).json(taskid);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
