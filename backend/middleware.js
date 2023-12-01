const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  });
};

module.exports = { verifyJWT };
