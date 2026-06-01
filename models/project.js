// name, description, a reference to the user who owns it
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,

    },



    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const project = mongoose.model("project", projectSchema);
module.exports = project;