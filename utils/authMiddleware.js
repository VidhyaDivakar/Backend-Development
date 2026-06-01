const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = req.headers.authorization;

    // checking if token exists
    if (!token) {
        return res.status(401).json({
            message: "Authentication token missing"
        });
    }

    // removing "Bearer " from token
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {

        //  token verification
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // storing user info in request
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;