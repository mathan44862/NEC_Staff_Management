const express = require('express');
const router = express.Router();
const controllers = require('../controllers/LeaveRequest');

router.get('/',controllers.leaveRequest);
router.post('/sendleaverequest',controllers.sendleaverequest);
router.post('/approvalleaverequest',controllers.approvalleaverequest);
router.post('/declineleaverequest',controllers.declineleaverequest);


module.exports = router;