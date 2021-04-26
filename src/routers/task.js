const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createTask,
    updateTask,
    getAllTasks,
    getTasksById,
    deleteTasksById
} = require("../controllers/task.js");

//--------------------create new task--------------------//
router.post("/task/create", auth, createTask);

//--------------------update new task--------------------//
router.patch("/task/update/:id", auth, updateTask);

//--------------------get All tasks--------------------//
router.get("/task/all", auth, getAllTasks);


//--------------------get  tasks by id--------------------//
router.get("/task/:id", auth, getTasksById);


//--------------------delete task--------------------//
router.delete("/task/:id", auth, deleteTasksById);

module.exports = router;
