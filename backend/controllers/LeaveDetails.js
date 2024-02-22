const LeaveInfoModel = require('../models/LeaveInfoModel')

const userLeaveDatails = async (req,res)=>{
    const {year,month} = req.body;
    try {
      const leaveInfo = await LeaveInfoModel.find({
        id: req.user.id,
        year: year, 
        month: month, 
      });
       (leaveInfo == 0)? 
        res.json({ nodata:'No leave' }) : res.json({ data:leaveInfo });
    } catch (error) {
      res.json(error);
    }
}

const userLeaveCount = async (req, res) => {
  const { year, month } = req.body;
  try {
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
    res.json({
      Vacation: vacation,
      Medical: medical,
      Casual: casual,
      Official: official,
      Exam: exam,
      Higherstudy: higherstudy,
      Others : others
    });
  } catch (error) {
    res.json(error);
  }
};

const userLeaves = async (req,res)=>{
  try {
    const leaveInfo = await LeaveInfoModel.find({
      id: req.user.id,
    });
    res.json(leaveInfo);
  } catch (error) {
    res.json(error);
  }
}

const staffsleavedetails = async (req,res)=>{
  try {
    console.log("hi");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth returns zero-based month index
    const currentDay = currentDate.getDate();
    const leaveInfo = await LeaveInfoModel.find({
      date:currentDay,
      month:currentMonth,
      year : currentYear
    });
    res.json(leaveInfo);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
    userLeaveDatails,
    userLeaveCount,
    userLeaves,
    staffsleavedetails
};