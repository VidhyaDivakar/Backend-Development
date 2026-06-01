### **Project Planning & Documentation**

### Server.js

This file will be the main file.

#### Models and Schema

In this project, we have the user.js, project.js and task.js models and the corresponding schemas.

#### Routes

Based on the models, we have the userRoutes.js, projectRoutes.js, and tasksRoutes.js which will be placed inside the api folder inside the routes folder. In this, we will cover Create Task, Get Tasks, Update Tasks, Delete Tasks, etc. These routes will be protected with hashing and authentication.

### Authentication

This API uses JWT authentication with the token in the authorization inside the Header

.env file will have the environment variables.

### Core Concepts in this Backend Development Project

* **Node.js & Express:** Server setup, modular routing, middleware implementation, and RESTful API design.
* **MongoDB & Mongoose:** Complex schema design with relationships (`ref`), data validation, and advanced Mongoose queries for CRUD operations.
* **Authentication & Authorization:** JWT-based user authentication (registration and login), password hashing with `bcrypt`, and multi-layered, ownership-based authorization rules.
