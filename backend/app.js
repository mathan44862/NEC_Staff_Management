const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const user = require('./routes/User')
const authenticationToken = require('./authentication/authenticationToken')
const leaveDetails = require('./routes/LeaveDetails')
const leaveRequest = require('./routes/LeaveRequest')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/NECSTAFFS");

app.use('/',user);
app.use('/leavedetails',authenticationToken,leaveDetails);
app.use('/leaverequest',authenticationToken,leaveRequest);


app.listen(5000, () => {
  console.log(`Server listening at http://localhost:5000`);
});
