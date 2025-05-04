import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";

export const verifyToken = (req, res, next) => {
    try {

        // const token = req.cookies.token;
        const token = req.headers.authorization?.split(' ')[1]; //Bearer token
        if (!token) {
            return res.status(401).send({ message: "Invalid token" })
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).send({ message: "Invalid token provided" })
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        console.error("Error verify token", error);
        res.status(401).send({ message: "Invalid token" })
    }
}