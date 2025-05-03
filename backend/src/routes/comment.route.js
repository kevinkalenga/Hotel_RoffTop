import express from "express";
import Comment from "../models/comment.model.js"

const router = express.Router();

// create a comment 
router.post('/post-comment', async (req, res) => {
    try {
        // console.log(req.body)
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({ message: "Comment created successfully", comment: newComment })
    } catch (error) {
        console.error("An error occurred while posting new comment", error);
        res.status(500).send({ message: "An error occurred while posting new comment" })
    }
})

export default router;