const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//POST /api/users/register

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // checking if user is an existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // create user (pre-save hook in model handles hashing)
        const newUser = await User.create({
            username,
            email,
            password
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

// login user POST api/users/login

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        //comparing the stored hashed password with the newly entered password.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        //creating paylod
        const payload = {
            _id: user._id,
            username: user.username
        };

        //sign token
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, //process.env refers to the environment variables available to the Node.js application.
            { expiresIn: "1h" } //process is a built-in Node.js global object
        );

        res.status(200).json({
            message: "login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;



