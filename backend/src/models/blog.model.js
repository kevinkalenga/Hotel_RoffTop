import mongoose from "mongoose";

// Modify after
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    content: String,
    coverImg: String,
    category: String,
    author: String,
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog