const express = require("express");
const router = express.Router();
const Project = require("../../models/project")

const authMiddleware = require("../../utils/authMiddleware")

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

// single project //GET /api/projects/:id
router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        // project not found
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // ownership check
        if (project.user.toString() !== req.user._id) {

            return res.status(403).json({
                message: "Not authorized"
            });
        }

        res.json(project);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});
// Update Project
//PUT /api/projects/:id
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        // project not found
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // ownership check
        if (project.user.toString() !== req.user._id) {

            return res.status(403).json({
                message: "Not authorized"
            });
        }

        const updatedProject = await Project.findByIdAndUpdate(

            req.params.id,

            {
                name: req.body.name,
                description: req.body.description
            },

            { new: true }

        );

        res.json(updatedProject);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// Delete Project .. /api/projects/:id
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        // project not found
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // ownership check
        if (project.user.toString() !== req.user._id) {

            return res.status(403).json({
                message: "Not authorized"
            });
        }

        await Project.findByIdAndDelete(req.params.id);

        res.json({
            message: "Project deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});


module.exports = router;

