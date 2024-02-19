const express = require('express');
const router = express.Router();
const controllers = require('../controllers/Todos');

router.post('/sendtodos',controllers.SendTodos);
router.get('/user',controllers.User);
router.get('/status',controllers.Status);
router.get('/',controllers.Todos);
router.post('/changestatus',controllers.ChangeStatus);

module.exports = router;