const jwt = require("jsonwebtoken");
const Customer = require("../model/customer.model");
require('dotenv').config();

const Authenticate = async (req, res, next) => {
  try {
    const token  = req.cookies.jwtoken;
 
    const verifyToken = jwt.verify(token,process.env.SECREAT_KEY);
   // console.log(verifyToken);
    const rootUser = await Customer.findOne({_id:verifyToken._id, 'tokens.token' : token});
    if(!rootUser) {throw new Error('User not found')}
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next(); 

  } catch (error) {
    res.status(401).send('Unauthorized : No Token Provided') 
    console.log(error);
  }
};

const adminAuthenticate = async (req, res, next) => {
  try {
    const token  = req.cookies.jwtoken;
 
    const verifyToken = jwt.verify(token,process.env.SECREAT_KEY);
   // console.log(verifyToken);
    const rootUser = await Admin.findOne({_id:verifyToken._id, 'tokens.token' : token});
    if(!rootUser) {throw new Error('User not found')}
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next(); 

  } catch (error) {
    res.status(401).send('Unauthorized : No Token Provided') 
    console.log(error);
  }
};

module.exports = {Authenticate,adminAuthenticate};  

