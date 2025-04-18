const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token must be in format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure this matches your signup/login
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Token invalid" });
  }
};




const requireHiringRole = (req, res, next) => {
    if (req.user.role !== "hiring") {
      return res.status(403).json({ message: "Access denied: Hiring role required" });
    }
    next();
  };
  
  module.exports = {
    verifyToken,
    requireHiringRole
  };
  