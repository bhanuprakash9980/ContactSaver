const jwt = require('jsonwebtoken');
const config = require('config');
const secret
if(process.env.NODE_ENV==="production")
 secret= process.env.jwtSecret;
 else
 secret=config.get('jwtSecret')
module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if not token
  if (!token) {
    res.status(401).json({ msg: 'No token authorisation denied' });
  }
  try {
    const decoded = jwt.verify(token,secret );
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token isn't valid" });
  }
};
