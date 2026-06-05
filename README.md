# Todolist CRUD

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

##### Todolist CRUD is a simple Task Management REST API built with Node.js, Express, and MongoDB. This application allows users to manage their daily tasks through full CRUD operations via a clean web interface. Deployed on Vercel with MongoDB Atlas as the cloud database.

## Features

- Create new tasks with title and description
- Read / view all existing tasks or get a single task by ID
- Update task details or mark task as completed
- Delete tasks that are no longer needed
- RESTful API structure with clean MVC routing
- Frontend interface built with vanilla HTML, CSS, and JavaScript
- Deployed on Vercel with serverless configuration


## Tech

Todolist CRUD uses the following Node.js libraries and tools to run properly:

- [express ^5.2.1](https://expressjs.com/) - Fast and minimalist web framework for Node.js
- [mongoose ^9.6.2](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [dotenv ^17.4.2](https://github.com/motdotla/dotenv) - Loads environment variables from a `.env` file
- [cors ^2.8.6](https://github.com/expressjs/cors) - Enables Cross-Origin Resource Sharing for the API
- [nodemon ^3.1.14](https://nodemon.io/) - Automatically restarts server on file changes (dev only)


## Environment Variables

Before running the project, create a `.env` file in the root directory and fill in the following variable:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
PORT=5000
```


## Directory Hierarchy

```
CRUD_TODOLIST
│   .env
│   index.js
│   package.json
│   package-lock.json
│   vercel.json
│
├───config
│       db.js
│
├───controller
│       task_controller.js
│
├───models
│       task_models.js
│
├───public
│   │   index.html
│   │   script.js
│   │   style.css
│   │
│   └───image
│           akaza-fireworks.jpg
│           tanjiro-kamado.jpg
│
└───route
        task_router.js
```


## Installation

Todolist CRUD requires [Node.js v18+](https://nodejs.org/en/download) and a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string to run.

#### Local Installation

```
git clone https://github.com/deviprajna/Todolist-crud.git
cd Todolist-crud
npm install
```

Create a `.env` file and add your `MONGO_URI`, then run:

```
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000` by default.

#### Deploy to Vercel

This project includes a `vercel.json` configuration for serverless deployment.

```
npm install -g vercel
vercel login
vercel --prod
```

Make sure to add `MONGO_URI` as an environment variable in your Vercel project settings.


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task by ID |
| DELETE | `/api/tasks/:id` | Delete a task by ID |


## Live Demo

🔗 [todolist-crud-snowy.vercel.app](https://todolist-crud-snowy.vercel.app)
