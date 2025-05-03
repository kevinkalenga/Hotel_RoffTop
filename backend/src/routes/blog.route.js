import express from "express";
import Blog from "../models/blog.model.js"

const router = express.Router();

// create a blog 
router.post("/create-post", async (req, res) => {
    try {
        // console.log("Blog data from api : ", req.body) 
        const newPost = new Blog({ ...req.body });
        await newPost.save();
        res.status(201).send({
            message: "Post created successfully",
            post: newPost
        })

    } catch (error) {
        console.error("Error creating post: ", error)
        res.status(500).send({ message: "Error creating post" })
    }
})


// get all blogs
router.get('/', async (req, res) => {
    try {
        const post = await Blog.find();
        res.status(200).send({
            message: "All posts retrieved successfully",
            posts: post
        })
    } catch (error) {

    }

})

export default router;