import express from "express";
const app = express()
const port = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send("Hotels Rooftop Server is running...!")
})

app.listen(port, () => {
    console.log(`Exemple app listening on port ${port}`)
})