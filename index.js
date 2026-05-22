require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db.js');
const ToDoList = require('.models/task_models.js');
const router = require('./route/task_router.js');


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/api/task', router);

connectDB();

module.exports= app;



