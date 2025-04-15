const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header instead of cookies
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied" });
  }
  
  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, secret, (err, info) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.userInfo = info;
    next();
  });
};

module.exports = authenticateToken;