import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send("Blog route is here")
})

export default router;