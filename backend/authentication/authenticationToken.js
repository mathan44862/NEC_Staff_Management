const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) return res.json({error:'Error'});
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};
module.exports = authenticationToken;