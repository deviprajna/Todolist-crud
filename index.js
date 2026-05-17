// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const PORT = process.env.PORT || 5000;
// const connectDB = require('./config/db.js');
// const ToDoList = require('.models/task_models.js')

app.use(express.json());
// app.use(cors());
// app.use(express.static('public'));
// app.use();

// connectDB();

// module.exports= app;



mongoose.connect('mongodb+srv://tasklistuser:tasklistuser123@backendtasklist.dlindzm.mongodb.net/?appName=backendtasklist')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
})
.catch((error) => {
    console.error('FAILED');
});
