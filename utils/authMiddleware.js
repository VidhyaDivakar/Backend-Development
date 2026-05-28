const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = req.headers.authorization;

    // check if token exists
    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing"
        });
    }

    // remove "Bearer " from token
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {

        // verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // store user info in request
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;