const LeaveRequestModel = require('../models/LeaveRequestModel');
const UserModel = require('../models/UserModel');
const LeaveInfoModel = require('../models/LeaveInfoModel')
const mailer = require('../mailer/index');

const leaveRequest = async(req,res)=>{
    try {
      let RequestLeaveInfomation;
      if (req.user.role === "principal") {
        RequestLeaveInfomation = await LeaveRequestModel.find();
      } else {
        RequestLeaveInfomation = await LeaveRequestModel.find({
          department: req.user.department,
          role: { $ne: req.user.role }
        });
      }
      if (RequestLeaveInfomation.length === 0) {
        res.json({ nodata: 'No leave request' });
      } else {
        res.json(RequestLeaveInfomation );
      }
    } catch (error) {
      res.json(error);
    }
}

const sendleaverequest = async (req, res) => {
  try {
    const leaveRequest = new LeaveRequestModel({
      id: req.user.id,
      name:req.user.name,
      department:req.user.department,
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
      reason: req.body.reason,
      role:req.user.role,
      email:req.user.email
    });
    const result = await leaveRequest.save();
    let  RequestLeaveInfomation = await UserModel.findOne({
      department: req.user.department,
      role: 'hod'
    });
    mailer('21it027@nandhaengg.org','Leave on '+req.body.date+'/'+req.body.month+'/'+req.body.year+' is requested by '+req.user.name);
    res.json({ message: "Leave Requested successfully" });
  } 
  catch (error) { 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const approvalleaverequest = async(req,res)=>{
  try {
    const idToDelete = req.body._id;
    const leaveinfo = await LeaveRequestModel.findOne({ _id: idToDelete });
    const result = await LeaveRequestModel.deleteOne({ _id: idToDelete });
    if (result.deletedCount === 1) {
      const leave = new LeaveInfoModel({
        id: leaveinfo.id,
        department:leaveinfo.department,
        date: leaveinfo.date,
        month: leaveinfo.month,
        year: leaveinfo.year,
        reason: leaveinfo.reason,
        role:leaveinfo.role,
        name:leaveinfo.name 
      });
      const result1 = await leave.save();
      mailer('21it027@nandhaengg.org','Your leave request on '+ leaveinfo.date+'/'+leaveinfo.month+'/'+leaveinfo.year+' is approved ');
      res.json({ message: "Approved successfully" });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const declineleaverequest = async(req,res)=>{
  try {
    const idToDelete = req.body._id;
    console.log(req.body)
    const leaveinfo = await LeaveRequestModel.findOne({ _id: idToDelete });
    const result = await LeaveRequestModel.deleteOne({ _id: idToDelete });
    if (result.deletedCount === 1) {
      mailer('21it027@nandhaengg.org','Your leave request on '+ leaveinfo.date+'/'+leaveinfo.month+'/'+leaveinfo.year+' is declined ');
      res.json({ message: "Approved successfully" });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
} 

module.exports = {
    leaveRequest,
    sendleaverequest,
    approvalleaverequest,
    declineleaverequest
}