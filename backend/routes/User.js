const express = require('express');
const controller = require('../controllers/Users');
const router = express.Router();

router.post("/", controller.signin);
router.get('/users', controller.users);
router.post('/adduser',controller.adduser);
router.post('/deleteuser',controller.deleteuser);
router.post('/updateuser',controller.updateuser);
router.get('/user/:id',controller.userById);

module.exports = router;
