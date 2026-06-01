const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3006;
// importing routes

const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");
const connectDB = require("./db/connectDB");
connectDB();
// middleware

app.use(express.json());



    //routes
    app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api", taskRoutes);

//Home Routes

app.get("/", (req, res) => {
    res.send("Project Management API Running");
});

//port
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});