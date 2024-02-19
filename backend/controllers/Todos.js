const UserModel = require('../models/UserModel');
const TodosModel  = require('../models/Todos')
const SendTodos = async(req,res)=>{
    res.send("SendTodos");
}
const User = async(req,res)=>{
    try{
        req.user.role = "hod";
        console.log(req.user.department);
        const User = await UserModel.find({
            department: req.user.department,
            role: { $ne: req.user.role }
        });
        res.send(User);
    }
    catch(error){
        res.json(error)
    }
}
const Status = async(req,res)=>{
    try{
        const Todos = await TodosModel.find({
            department: "IT"
        })
        res.send(Todos);
    }
    catch(error){
        res.json(error);
    }
}
const Todos = async(req,res)=>{
    try{
        const UserTodos = await TodosModel.find({
            id:'21it031'
        })
        res.json(UserTodos);
    }
    catch(error){
        res.json(error);
    }
}
const ChangeStatus = async(req,res)=>{
    try {
        const UserTodos = await TodosModel.find({ id: '21it031' });
    
        for (const todo of UserTodos) {
            if (todo.status === "not started") {
                await TodosModel.updateOne({ _id: todo._id }, { $set: { status: "progress" } });
            }
            else if(todo.status === "progress"){
                await TodosModel.updateOne({ _id: todo._id }, { $set: { status: "finished" } });
            }
        }
        res.json({message:"Todos updated successfully!"});
    } catch (error) {
        res.json(error);
    }
    
}

module.exports = {
    SendTodos,
    User,
    Status,
    Todos,
    ChangeStatus
} ;