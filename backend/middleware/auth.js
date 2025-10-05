const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "No token provided" } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: { code: "INVALID_TOKEN", message: "Invalid token" } });
  }
};
