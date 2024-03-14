const mongoose = require('mongoose');
const LeaveSchema = new mongoose.Schema({
    id: String, 
    date: Number,
    month: Number,
    year: Number,
    reason: String,
    department:String,
    role :String,
    name:String,
    email:String,
    reasonType:String,
    session:String
});
const LeaveInfoModel = mongoose.model('LeaveInfo', LeaveSchema);
module.exports = LeaveInfoModel;