// l'adresse IP de wsl 172.28.195.60 172.17.0.1
import express from "express";
import User from "../models/user.model.js";
import { generateToken } from "../middleware/generateToken.js"
import authenticateToken from '../middleware/authenticateToken.js';



const router = express.Router();

// register a new user 
router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body
        const user = User({ username, email, password })
        // console.log(user)
        await user.save();
        res.status(200).send({ message: "User registration successfully!" })
    } catch (error) {
        console.error("Failed to register", error)
        res.status(500).json({ message: "Registration failed" })
    }
})

// login a new user 
router.post('/login', async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password!" })
        }

        // generate token here
        const token = await generateToken(user._id)
        // console.log(token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // En production, secure est true,
            sameSite: true
        })
        res.status(200).send({
            message: "Login successful!", user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role

            }
        })
    } catch (error) {
        console.error("Failed to login", error);
        res.status(500).json({ message: 'Login failed! Try again' })
    }
})

// logout a user 
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: "Logged out successfully!" })
    } catch (error) {
        console.error("Failed to logout", error);
        res.status(500).json({ message: 'Logout failed!' })
    }
})

// get all users 
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'id email role');
        // res.status(200).send({ message: "Users found successfully", users })
        res.status(200).send(users)
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: 'Failed to fetch users' })
    }
})
// current user
router.get('/me', authenticateToken, (req, res) => {
    res.status(200).json(req.user);
});

// delete a user 
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        res.status(200).send({ message: "User deleted successfully" })

    } catch (error) {
        console.error("Error deleting user", error);
        res.status(500).json({ message: 'Error deleting user' })
    }
})
// update a user role
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        res.status(200).send({ message: "User role updated successfully", user })

    } catch (error) {
        console.error("Error updating user role", error);
        res.status(500).json({ message: 'Error updating user role' })
    }
})

export default router;