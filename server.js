const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

// 🔥 CONNECT DATABASE
mongoose.connect("YOUR_MONGODB_URL")
.then(() => console.log("DB connected"))
.catch(err => console.log(err))

// 🔥 SCHEMA
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String
})

const User = mongoose.model("User", userSchema)

// 🔥 ROUTE
app.post("/join", async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.json({ message: "Saved successfully" })
    } catch (err) {
        res.status(500).json({ message: "Error saving data" })
    }
})

app.get("/", (req, res) => {
    res.send("Backend running")
})

app.listen(3000, () => {
    console.log("Server started")
})
