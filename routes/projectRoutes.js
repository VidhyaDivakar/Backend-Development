const express = require("express");
const router = express.Router();
const Project = require("../models/project")

const authMiddleware = require("../utils/authMiddleware")

// crud
// creating project POST /api/projects

router.post("/", authMiddleware, async (req, res) => {

    try {

        const project = await Project.create({

            name: req.body.name,

            description: req.body.description,

            // owner from logged-in user
            user: req.user._id
        });

        res.status(201).json(project);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// GET All Projects GET /api/projects

router.get("/", authMiddleware, async (req, res) => {

    try {

        // only logged-in user's projects
        const projects = await Project.find({
            user: req.user._id
        });

        res.json(projects);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});
