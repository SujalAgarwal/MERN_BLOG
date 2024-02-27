const jwt = require("jsonwebtoken");
const errorhandler = require("./error.js");
 const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorhandler(401,"Unauthorized"));
  }
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err)
    {
      return next(errorhandler(401,"unauthorized"));
    }
    req.user=user;
    next();
  })
};

module.exports={verifytoken};
