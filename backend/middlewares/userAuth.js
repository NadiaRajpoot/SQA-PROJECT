const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("please Login!!");
    }
    //verify the token
    const decodedObj = await jwt.verify(token, "SQA@5000");
    const { id } = decodedObj;
 
    //find user
    const user = await User.findById(id);
    if (!user) {
      throw new Error("user does not exist!");
    }

    req.user = user;
    
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
module.exports = userAuth;