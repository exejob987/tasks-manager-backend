const jwt = require("jsonwebtoken");
const blacklist = require("../config/blacklist");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  if (blacklist.isBlacklisted(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not provided or invalid" });
  }
};

module.exports = authMiddleware;
