const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'Missing token', status: 'fail' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, 'your-secret-key');

    // Attach the user ID to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', status: 'fail' });
  }
}

module.exports = {
  authenticateToken
};
