require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db.js');
const router = require('./route/task_router.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api/tasks', router);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;



