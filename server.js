require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// importing routes

const userRoutes = require("./routes/api/userRoutes");
const projectRoutes = require("./routes/api/projectRoutes");
const taskRoutes = require("./routes/api/taskRoutes");

// middleware

app.use(express.json());

// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log(error);
    });

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