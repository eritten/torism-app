const jwt = require("jsonwebtoken");
const config = require("config");

function authMiddleware(req, res, next) {
    const authorization = req.header.authorization;
    if (!authorization) {
        return res.status(401).json({ "message": "Authorization header is required" });
    }
    try {
        const decodedData = jwt.verify(authorization, config.get("JSONWEBTOKEN"));
        req.user = decodedData;
        next();
    }
    catch (e) {
        return res.status(500).json({ "message": "Internal service error" });
    }
}