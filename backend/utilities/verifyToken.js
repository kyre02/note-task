import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
            }
            req.user = decoded; // Ensure the decoded token payload is set to req.user
            next();
        });
    } catch (error) {
        console.log("Error verifying token", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};