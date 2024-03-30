var jwt = require("jsonwebtoken");
const JWT_SECRET = 'shivamisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Unauthorized: Please provide a valid token" });
    }
    try {
        // Verify the token
        console.log(token);
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log the decoded token for debugging
        // Add user information to the request object
        req.user = decoded.user;
        next();
    } catch (error) {
        // Handle token verification errors
        console.error('JWT Verification Error:', error.message);
        return res.status(401).send({ error: "Unauthorized: Invalid token" });
    }
}

module.exports = fetchuser;
