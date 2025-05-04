// l'adresse IP de wsl 172.28.195.60 172.17.0.1
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

// login a new user 
router.post("/login", async (req, res) => {
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

        //    Todo: generate token here
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

export default router;