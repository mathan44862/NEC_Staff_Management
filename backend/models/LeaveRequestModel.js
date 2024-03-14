const mongoose = require('mongoose');

const RequestLeaveInfoModel = mongoose.model('RequestLeaveInfo', new mongoose.Schema({
    id: String,
    department:String,
    name:String,
    date: Number,
    month: Number,
    year: Number,
    reason: String,
    role :String,
    email:String,
    reasonType:String,
    session:String
})); 

module.exports = RequestLeaveInfoModel;