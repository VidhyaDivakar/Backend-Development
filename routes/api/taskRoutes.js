const express = require("express");

const router = express.Router();

const Task = require("../../models/task");
const Project = require("../../models/project");

const authMiddleware = require("../../utils/authMiddleware");
// create tasks
router.post(
    "/projects/:projectId/tasks",
    authMiddleware,
    async (req, res) => {

        try {

            // find project
            const project = await Project.findById(req.params.projectId);

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

            // create task
            const task = await Task.create({

                title: req.body.title,

                description: req.body.description,

                status: req.body.status,

                project: project._id
            });

            res.status(201).json(task);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

// GET All Tasks for a project
router.get(
    "/projects/:projectId/tasks",
    authMiddleware,
    async (req, res) => {

        try {

            // find project
            const project = await Project.findById(req.params.projectId);

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

            // get tasks
            const tasks = await Task.find({
                project: project._id
            });

            res.json(tasks);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

//Update //PUT /api/tasks/:taskId

router.put(
    "/tasks/:taskId",
    authMiddleware,
    async (req, res) => {

        try {

            // find task
            const task = await Task.findById(req.params.taskId);

            // task not found
            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            // find parent project
            const project = await Project.findById(task.project);

            // ownership check
            if (project.user.toString() !== req.user._id) {

                return res.status(403).json({
                    message: "Not authorized"
                });
            }
            const updatedTask = await Task.findByIdAndUpdate(

                req.params.taskId,

                {
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status
                },

                { new: true }

            );

            res.json(updatedTask);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

// detele task //  DELETE /api/tasks/:taskId

router.delete(
    "/tasks/:taskId",
    authMiddleware,
    async (req, res) => {

        try {

            // find task
            const task = await Task.findById(req.params.taskId);

            // task not found
            if (!task) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            // find parent project
            const project = await Project.findById(task.project);

            // ownership check
            if (project.user.toString() !== req.user._id) {

                return res.status(403).json({
                    message: "Not authorized"
                });
            }

            // delete task
            await Task.findByIdAndDelete(req.params.taskId);

            res.json({
                message: "Task deleted successfully"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);


module.exports = router;