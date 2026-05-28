const mongoose = require('mongoose');
const TaskList = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description:{
            type: String,
            default: '',
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const ToDoList = mongoose.model('ToDoList', TaskList);
module.exports = ToDoList;