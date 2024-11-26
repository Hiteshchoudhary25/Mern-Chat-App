import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

const protectRoute = async (req, res, next) => {
    try {
        // Access the token correctly from req.cookies
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ error: "Not authorized, token required" });
        }

        // Verify the token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decoded) {
            return res.status(401).json({ error: "Not authorized, token invalid" });
        }

        // Find the user by the decoded UserId
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(401).json({ error: "Not authorized , user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route", error.message);
        res.status(401).json({ error: "Not authorized, token failed" });
    }
};

export default protectRoute;
