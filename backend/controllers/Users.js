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
            const { email, role, id, department, name, joiningdate } = foundUser;
            const userid = { email: email, role: role || 'staff', id: id, department: department, name: name };
            const accessToken = jwt.sign(userid, process.env.ACCESS_TOKEN);

            res.json({ accessToken: accessToken });
        } else {
            res.json({ error: 'Account not found' });
        }
    } catch (error) {
        res.json(error);
    }  
};

const users = async(req,res)=>{
    try {
      const Users = await UserModel.find();
      res.json(Users);
    } catch (error) {
      res.json(error);
    }
}

const adduser = async(req,res)=>{
    const {name,department,id,email,role} = req.body;
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
            role
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
    const {_id,name,department,id,email,role} = req.body;
    console.log(req.body);
    try{
        const filter = { _id: _id };
        const updateData = { $set: {  role,name,department,id,email} };
        const result = await UserModel.updateOne(filter, updateData);
        if (result.matchedCount > 0) {
            res.json({ message: "Updated successfully" });
        } else {
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
    updateuser
};
