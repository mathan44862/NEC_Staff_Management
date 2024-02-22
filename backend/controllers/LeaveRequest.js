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
    const {reasonType} = req.body;
    const leaveRequest = new LeaveRequestModel({
      id: req.user.id,
      name:req.user.name,
      department:req.user.department,
      date: req.body.date,
      month: req.body.month,
      year: req.body.year,
      reason: req.body.reason,
      role:req.user.role,
      email:req.user.email,
      reasonType:reasonType
    });
    year  = req.body.year;
    month= req.body.month;
    var LeaveInfomation1;
    var LeaveInfomation2;
    var vacation = 0;
    var medical = 0;
    var casual = 0;
    var official = 0;
    var exam = 0;
    var higherstudy = 0;
    var others = 0;
    if(month>=6){
      LeaveInfomation1 = await LeaveInfoModel.find({
        id: req.user.id,
        year: year,
        month: { $gte: 6, $lte:  12}
      });
      LeaveInfomation2 = await LeaveInfoModel.find({
        id: req.user.id,
        year: year+1,
        month: { $gte: 1, $lte:  5}
      });
    }
    if(month <6){
      LeaveInfomation1 = await LeaveInfoModel.find({
        id: req.user.id,
        year: year-1,
        month: { $gte: 6, $lte:  12}
      });
      LeaveInfomation2 = await LeaveInfoModel.find({
        id: req.user.id,
        year: year,
        month: { $gte: 1, $lte:  5}
      });
    }
    if (LeaveInfomation1 && LeaveInfomation1.length > 0) {
      LeaveInfomation1.forEach((leave) => {
        switch (leave.reasonType) {
          case "vacation":
            vacation++;
            break;
          case "medical":
            medical++;
            break;
          case "casualleave":
            casual++;
            break;
          case "official":
            official++;
            break;
          case "exam":
            exam++;
            break;
          case "higherstudy":
            higherstudy++;
            break;
          default :
            others++;
            break;
        }
      });
    }
    if (LeaveInfomation2 && LeaveInfomation2.length > 0) {
        LeaveInfomation2.forEach((leave) => {
          switch (leave.reasonType) {
            case "vacation":
              vacation++;
              break;
            case "medical":
              medical++;
              break;
            case "casualleave":
              casual++;
              break;
            case "official":
              official++;
              break;
            case "exam":
              exam++;
              break;
            case "higherstudy":
              higherstudy++;
              break;
            default :
              others++;
              break;
          }
        });
    } 
      if(req.body.reasonType == "vacation"){
        if(vacation == 12){
          res.json({Noleave:"No leave"})
        }
      }
      else if(req.body.reasonType == "medical"){
        if(medical == 2){
          res.json({Noleave:"No leave"})
        }
      }
      else if(req.body.reasonType == "casualleave"){
        if(casual == 12){
          res.json({Noleave:"No leave"})
        }
      }
      else if(req.body.reasonType == "offical"){
        if(official == 12){
          res.json({Noleave:"No leave"})
        }
      }
      else if(req.body.reasonType == "exam"){
        if(exam == 12){
          res.json({Noleave:"No leave"})
        }
      }
      else if(req.body.reasonType == "higerstudy"){
        if(higherstudy == 12){
          res.json({Noleave:"No leave"})
        }
      }  

      const result = await leaveRequest.save();
      if(req.body.role == "staff"){
        let  RequestLeaveInfomation = await UserModel.findOne({
          department: req.user.department,
          role: 'hod'
      });
      mailer('21it027@nandhaengg.org','Leave on '+req.body.date+'/'+req.body.month+'/'+req.body.year+' is requested by '+req.user.name);
      }
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
    console.log(leaveinfo);
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
        name:leaveinfo.name ,
        reasonType:leaveinfo.reasonType
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