const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Backend is running")
})

app.post("/join", (req, res) => {
    const data = req.body
    console.log(data)
    res.send("Form received")
})

app.listen(3000, () => {
    console.log("Server started")
})