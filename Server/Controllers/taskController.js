const Task = require("../models/Task");

exports.createTask = async (req, res) => {

    try {

        const { taskTitle, taskDesc, taskStatus } = req.body;
        const { userId } = req;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "userId is missing"
            });

        }
        if (!taskTitle || !taskDesc || !taskStatus) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });

        }

        const task = await Task.create({ ...req.body, user: userId });


        res.status(201).json({
            success: true,
            message: "Task added succesfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.editTask = async (req, res) => {
    try {
        const { userId } = req;
        const { taskId } = req.params;
        const { taskTitle, taskDesc, taskStatus } = req.body;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "userId is missing"
            });
        }

        if (!taskTitle || !taskDesc || !taskStatus) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            { taskTitle, taskDesc, taskStatus },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const { userId } = req;
        const { taskId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "userId is missing"
            });
        }

        const task = await Task.findOneAndDelete({
            _id: taskId,
            user: userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getAllTasks = async (req, res) => {
    try {
        const { userId } = req;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "userId is missing"
            });
        }

        const tasks = await Task.find({ user: userId });

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            totalTasks: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



