const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, secret, (err, info) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.userInfo = info;
    next();
  });
};

module.exports = authenticateToken;
