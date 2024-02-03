const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    id: String,
    department: String,
    name: String,
    joiningdate: String
});

const UserModel = mongoose.model("staff", UserSchema);

module.exports = UserModel;