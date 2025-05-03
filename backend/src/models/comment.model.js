import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    //  The user that post the comment and ref to reference de user from User(user.model.js)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


}, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment;