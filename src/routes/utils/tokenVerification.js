import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ message: 'Access denied: token is missing or invalid' })

    try {
        const verifiedDecodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = verifiedDecodedUser;
        next();
    } catch (error) {
        res.status(400).json({message: 'Token is invalid'})
    }
}