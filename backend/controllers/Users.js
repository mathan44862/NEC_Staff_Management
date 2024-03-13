const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel')

const signin = async (req, res) => {
    const { email, password } = req.body;
    if(!email){
        res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
        const foundUser = await UserModel.findOne({ email });
        if (foundUser) {
            const { email, role, id, department, name,_id } = foundUser;
            const userid = { email: email, role: role || 'staff', id: id, department: department, name: name ,_id:_id};
            if (password == foundUser.password) {
                const { email, role, id, department, name, _id } = foundUser;
                const user = { email, role: role || 'staff', id, department, name, _id };
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
                
                return res.json({ accessToken });
            } else {
                res.json({ error: 'Account not found' });
            }
        } else {
            res.json({ error: 'Account not found' });
        }
    } catch (error) {
        res.json(error);
    }  
};

const users = async(req,res)=>{
    try {
    const Users = await UserModel.find({ role: { $ne: "admin" }});
      res.json(Users);
    } catch (error) {
      res.json(error);
    }
}

const userById = async(req,res)=>{
    try {
    const id = req.params.id;
      const Users = await UserModel.find({_id:id});
      console.log(Users);
      res.json(Users);
    } catch (error) {
      res.json(error);
    }
}

const adduser = async(req,res)=>{
    const {name,department,id,email,role,password} = req.body;
    try{
        const Search = await UserModel.find({id});
        if(Search.length>0){
            res.json({ error: "Already account is find" });
        }
       else{
        const User = new UserModel({
            name,
            department,
            id,
            email,
            role,
            password
        });
        const result1 = await User.save();
        res.json({ message: "Added successful" });
       }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteuser = async(req,res)=>{
    const {_id} = req.body;
    try{
        const result = await UserModel.deleteOne({ _id: _id });
        if (result.deletedCount === 1) {
            res.json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ error: "Document not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateuser = async(req,res)=>{
    const {name,department,id,email,role,password} = req.body;
    try{
        const filter = { id: id };
        const updateData = { $set: {  role,name,department,id,email,password} };
        const result = await UserModel.updateOne(filter, updateData);
        if (result.matchedCount > 0) {
            res.json({ message: "Updated successfully" });
        } 
        else {
            res.status(404).json({ error: "User not found" });
        }
       
    }
    catch (error){
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    signin,
    users,
    adduser,
    deleteuser,
    updateuser,
    userById
};
