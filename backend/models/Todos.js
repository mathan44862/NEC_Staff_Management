const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
    task:String,
    status:String,
    department:String,
    name:String,
    id:String,
    taskdescription:String
});

const TodosModel = mongoose.model("todos", TodosSchema);

module.exports = TodosModel;