const express = require("express");


const { createTask, getAllTasks, deleteTask, editTask } = require("../Controllers/taskController");
const { userAuthenticate } = require("../middlewares/auth");

const router = express.Router();

router.route("/create").post(userAuthenticate,  createTask);
router.route("/all-tasks").get(userAuthenticate,getAllTasks);

router.route("/:taskId").delete(userAuthenticate,deleteTask).put(userAuthenticate,editTask);

module.exports = router;