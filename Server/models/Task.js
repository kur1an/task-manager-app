const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: [true, "please enter the title of the task"] },

    taskDesc: { type: String, required: [true, "Please enter the task Desrption"] },

    taskStatus: { type: String, enum: ["pending", "completed"], required: [true, "please enter the task status"] },


    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is missing"] },

});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;


