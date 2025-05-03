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

// Get all comments count 

router.get("/total-comments", async (req, res) => {
    try {
        const totalComment = await Comment.countDocuments({});
        res.status(200).send({ message: "Total comments", totalComment })
    } catch (error) {
        console.error("An error occurred while getting comment count", error);
        res.status(500).send({ message: "An error occurred while getting comment count" })
    }
})

export default router;