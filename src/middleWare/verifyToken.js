const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.json({
        status: "failed",
        message: "Sorry! You are not authorized.",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      status: "failed",
      error: "Invalid token",
    });
  }
};
