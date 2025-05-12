import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log('Token from cookie:', token);
        if (!token) {
            return res.status(401).send({ message: 'Token not found' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.userId) {
            return res.status(401).send({ message: 'User ID not found in token' });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send({ message: 'Invalid token' });
    }
};



// export const verifyToken = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
//         if (!token) {
//             return res.status(401).send({ message: "Token missing" });
//         }

//         const decoded = jwt.verify(token, JWT_SECRET);

//         if (!decoded.id) {
//             return res.status(401).send({ message: "Invalid token provided" });
//         }

//         req.userId = decoded.id;  // correspond à ce que tu as mis lors du sign
//         req.role = decoded.role;
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         res.status(401).send({ message: "Invalid or expired token" });
//     }
// };

////////////////////////////////////////////////////////////////////////////////


// import jwt from "jsonwebtoken"
// import { JWT_SECRET } from "../config.js";

// export const verifyToken = (req, res, next) => {
//     try {

//         // const token = req.cookies.token;
//         const token = req.headers.authorization?.split(' ')[1]; //Bearer token
//         if (!token) {
//             return res.status(401).send({ message: "Invalid token" })
//         }

//         const decoded = jwt.verify(token, JWT_SECRET);
//         if (!decoded.userId) {
//             return res.status(401).send({ message: "Invalid token provided" })
//         }

//         req.userId = decoded.userId;
//         req.role = decoded.role;
//         next();

//     } catch (error) {
//         console.error("Error verify token", error);
//         res.status(401).send({ message: "Invalid token" })
//     }
// }