const UserModel = require('../models/UserModel');
const TodosModel  = require('../models/Todos');
const mailer = require('../mailer/index');
const SendTodos = async(req,res)=>{
    const {task,taskdescription,date,month,year,User}= req.body;
    User.map(async (user)=>{
        const Todos = new TodosModel({
            task:task,
            taskdescription,
            name:user.name,
            id:user.id,
            department:user.department,
            status:"not started",
            date:date,
            month:month,
            year:year,
            role:user.role,
            taskby:req.user.role
        })
        const result = await Todos.save();
    })
    res.json({"message":"Todo send"});
}
const User = async(req,res)=>{
    try{
        console.log(req.user.department);
        let User ;
        if(req.user.role === "hod"){
            User = await UserModel.find({
                department: req.user.department,
                role: { $ne: req.user.role }
            });
        }
        else if(req.user.role === "principal"){
            User = await UserModel.find({
                role: { $ne: req.user.role }
            });
        }
        res.send(User);
    }
    catch(error){
        res.json(error)
    }
}
const Status = async(req,res)=>{
    try{
        let Todos;
        if(req.user.role === "hod"){
            Todos = await TodosModel.find({
                department: req.user.department
            })
        }
        else if(req.user.role === "principal"){
            Todos = await TodosModel.find();
        }
        res.send(Todos.reverse());
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
                mailer('21it027@nandhaengg.org','Task is started by ' +req.user.name);
            }
            else if(todo.status === "progress"){
                await TodosModel.updateOne({ _id: todo._id }, { $set: { status: "finished" } });
                mailer('21it027@nandhaengg.org','Task is finished by ' +req.user.name);
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