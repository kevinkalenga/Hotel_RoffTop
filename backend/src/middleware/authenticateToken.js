
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Vérifie dans les cookies ou les en-têtes

    if (!token) {
        return res.status(401).send({ message: "Authentication required" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" });
        }

        req.user = decoded; // Récupère les informations de l'utilisateur depuis le token
        next();
    });
};

export default authenticateToken;


// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import { JWT_SECRET } from '../config.js';

// const authenticateToken = async (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(decoded.userId).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         req.user = user; // Ajoute l'utilisateur à la requête
//         next();
//     } catch (error) {
//         console.error('Authentication error:', error);
//         res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

// export default authenticateToken;
