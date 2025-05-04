import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


}, {
    timestamps: true,
})

// Hash password before saving to database 
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    user.password = hashedPassword;
    next()
})

// Compare password when user tries to login 
userSchema.methods.comparePassword = function (givenPassword) {
    return bcryptjs.compare(givenPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User;