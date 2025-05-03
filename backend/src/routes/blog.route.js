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
        const { search, category, location } = req.query
        console.log(search);

        let query = {}

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { cpntent: { $regex: search, $options: "i" } }
                ]
            }
        }

        if (category) {
            query = {
                ...query,
                category
            }
        }

        if (location) {
            query = {
                ...query,
                location
            }
        }

        const post = await Blog.find(query).sort({ createdAt: -1 });
        res.status(200).send({
            message: "All posts retrieved successfully",
            posts: post
        })
    } catch (error) {

    }

})

export default router;