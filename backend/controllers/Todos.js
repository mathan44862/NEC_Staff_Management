const UserModel = require('../models/UserModel');
const TodosModel  = require('../models/Todos')
const SendTodos = async(req,res)=>{
    console.log(req.body);
}
const User = async(req,res)=>{
    try{
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
            department: req.user.department
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
            id:req.user.id
        })
        res.json(UserTodos);
    }
    catch(error){
        res.json(error);
    }
}
const ChangeStatus = async(req,res)=>{
    try {
        console.log(req.body);
        const UserTodos = await TodosModel.find({ _id: req.body._id });

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