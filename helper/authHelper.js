const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware to verify JWT and attach user data to request
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If no token is provided

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid or expired

    try {
      const foundUser = await User.findByPk(user.id);
      if (!foundUser) return res.sendStatus(401); // If user is not found

      req.user = {id:foundUser.id,username:foundUser.username,email:foundUser.email}; // Attach user data to req
      next(); // Proceed to next middleware or route handler
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = {authenticateToken};
