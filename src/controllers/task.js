const Task = require("../models/task");

//--------------------create new task--------------------//
const createTask = (req, res) => {
    const task = new Task(req.body);
    task.owner = req.user._id;
    task.save(req.user)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};


//--------------------update task--------------------//
const updateTask = (req, res) => {
    const id = req.params.id;
    if (req.body.description || req.body.completed) {
        Task.findByIdAndUpdate({ _id: id }, req.body, { new: true })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(404).json({ error: err });
            });
    } else {
        res.status(422).json({ error: "prams not match" });
    }
};


//--------------------get All task--------------------//
const getAllTasks = (req, res) => {
    req.user
        .populate({ path: "tasks" })
        .execPopulate()
        .then((user) => {
            if(user.tasks.length <= 0){
                res.status(404).json({ error: "Task Not Found!" });
                return;
            } 
            res.json(user.tasks);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};



//--------------------get task by id--------------------//
const getTasksById = (req, res) => {
    Task.findById({_id: req.params.id})
    .then(result => {
        if(!result){
            res.status(404).json({ error: "Task Not Found!" });
            return;
        } 
        res.json({result, message: "Task Has Found"});
    })
    .catch((error) => {
        res.status(404).json({ error: "Task Not Found!" });
    });
};


//--------------------delete task by id--------------------//
const deleteTasksById = (req, res) => {
    Task.findByIdAndDelete({_id: req.params.id})
    .then(result => {
        if(!result){
            res.status(404).json({ error: "Task Not Found!" });
            return;
        } 
        res.json({result, message: "Task Deleted!"});
    })
    .catch((error) => {
        res.status(404).json({ error: "Task Not Found!" });
    });
};

module.exports = {
    createTask,
    updateTask,
    getAllTasks,
    getTasksById,
    deleteTasksById
};
