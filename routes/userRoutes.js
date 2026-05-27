const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//POST /api/users/register

router.post("register", async (res, req)=>{
    try{
const { username, email, password } = req.body;
// checking if user is an existing user
const exitingUser = await User.findOne({ email });
is (existingUser){
    return res.statusCode(400).json({
        message: "User already exists"
    });
}
// hashing the password
const hashedPassword = await bcrypt.hash(password, 10);
// create user
const newUser = await User.create({
    username,
    email,
    password: hashedPassword
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
