const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
},{ timestamps: true })


const  Task = mongoose.model("Task", taskSchema);
module.exports = Task
