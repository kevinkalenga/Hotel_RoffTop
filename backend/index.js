import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express()
const port = process.env.PORT || 5000

// parse options 
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// routes
import blogRoutes from "./src/routes/blog.route.js"
import commentRoutes from "./src/routes/comment.route.js"
import userRoutes from "./src/routes/user.route.js"

app.use('/api/blogs', blogRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/users', userRoutes)



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connexion reussi')
}).catch((err) => {
    console.log('Connection non reussi', err)
})


app.get('/', (req, res) => {
    res.send("Hotels Rooftop Server is running...!")
})

app.listen(port, () => {
    console.log(`Exemple app listening on port ${port}`)
})