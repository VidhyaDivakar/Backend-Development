// username, email, passowrd ; hash password
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

userSchema.pre("save", async function (next){
    if (this.isNew || this.isModified("password")) {
        const bcrypt = require("bcrypt");
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    });
    const user = mongoose.model("user", userSchema);

    module.exports = user;
