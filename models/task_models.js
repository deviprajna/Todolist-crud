const mongoose = require('mongoose');
const TaskList = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('ToDoList', TaskList);
module.exports = ToDoList;