import express from "express";
import User from "../models/user.model.js";


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


export default router;